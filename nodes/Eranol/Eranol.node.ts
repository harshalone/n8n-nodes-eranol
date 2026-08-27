import {
	NodeApiError,
	NodeConnectionTypes,
	NodeOperationError,
	type IDataObject,
	type IExecuteFunctions,
	type IHttpRequestOptions,
	type INodeExecutionData,
	type INodeProperties,
	type INodeType,
	type INodeTypeDescription,
	type JsonObject,
} from 'n8n-workflow';

import { OPERATIONS, OPERATION_BY_VALUE, OPERATION_OPTIONS } from './operations';
import {
	buildPublishBody,
	getSocialRoute,
	socialFields,
	type SocialOperation,
	type SocialPlatform,
} from './social';

const BASE_URL = 'https://eranol.com/api/v1';

/**
 * Coerce an HTTP response into a JSON-safe object for n8n output.
 *
 * `httpRequest` normally returns the parsed body, but if the response is a full
 * wrapper (status/headers/body with circular socket refs) we extract `body`,
 * and otherwise fall back to a plain string/value wrapper. This prevents
 * "Converting circular structure to JSON" errors.
 */
function toJsonSafe(data: unknown): IDataObject | IDataObject[] {
	if (data === null || data === undefined) {
		return { success: true };
	}

	if (typeof data === 'object') {
		const obj = data as Record<string, unknown>;
		// Full-response wrapper: surface just the body.
		if ('body' in obj && ('headers' in obj || 'statusCode' in obj)) {
			return toJsonSafe(obj.body);
		}
		try {
			// Round-trip to drop any non-serialisable (circular) properties.
			return JSON.parse(JSON.stringify(obj)) as IDataObject | IDataObject[];
		} catch {
			return { result: String(data) };
		}
	}

	return { result: data as string | number | boolean };
}

/**
 * Universal body UI. For each operation, shown only when that operation is
 * selected: a slim notice linking to the operation's documentation page (n8n
 * auto-links the bare URL), then an empty "Body (JSON)" editor. The docs page
 * lists the exact payload fields and examples to paste in.
 */
const universalBodyFields: INodeProperties[] = OPERATIONS.flatMap((op) => [
	{
		displayName: `See the <a href="${op.docs}" target="_blank">${op.name} payload reference</a>.`,
		name: `docs_${op.value}`,
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['universal'],
				eranolAction: [op.value],
			},
		},
	},
	{
		displayName: 'Body (JSON)',
		name: `body_${op.value}`,
		type: 'json',
		default: '{}',
		description: 'Request body sent to the Eranol API. See the payload reference link above.',
		displayOptions: {
			show: {
				resource: ['universal'],
				eranolAction: [op.value],
			},
		},
	},
]);

export class Eranol implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Eranol',
		name: 'eranol',
		icon: 'file:eranol.svg',
		group: ['transform'],
		version: 1,
		subtitle:
			'={{ $parameter["resource"] === "job" ? $parameter["operation"] : $parameter["resource"] === "social" ? $parameter["platform"] + ": " + $parameter["socialOperation"] : $parameter["eranolAction"] }}',
		description: 'Interact with the Eranol media processing API',
		defaults: {
			name: 'Eranol',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'eranolApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Universal',
						value: 'universal',
						description: 'Run any Eranol API operation with a JSON body',
					},
					{
						name: 'Social',
						value: 'social',
						description: 'Publish and manage scheduled posts on Instagram, TikTok, YouTube, and X',
					},
					{
						name: 'Job',
						value: 'job',
						description: 'Check job status, fetch results, or verify your API key',
					},
				],
				default: 'universal',
			},
			// ── Universal ──────────────────────────────────────────────────────
			// A single-option "operation" so n8n renders exactly ONE "Universal"
			// tile in the nodes panel (n8n generates one tile per option of the
			// parameter literally named "operation"). It is hidden inside the node
			// so users only see the real "Operation" picker (eranolAction) below.
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'hidden',
				noDataExpression: true,
				options: [
					{
						name: 'Universal',
						value: 'universal',
						action: 'Universal',
						description: 'Run any Eranol API operation with a JSON body',
					},
				],
				default: 'universal',
				displayOptions: {
					show: {
						resource: ['universal'],
					},
				},
			},
			// The actual operation picker shown inside the Universal node.
			{
				displayName: 'Operation',
				name: 'eranolAction',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['universal'],
					},
				},
				options: OPERATION_OPTIONS,
				default: 'trim',
			},
			...universalBodyFields,
			// ── Social ─────────────────────────────────────────────────────────
			// Same hidden-"operation" trick as Universal: n8n renders one tile per
			// option of a parameter literally named "operation", so it is hidden
			// here and the real picker (socialOperation, defined in social.ts) is
			// what users see.
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'hidden',
				noDataExpression: true,
				options: [
					{
						name: 'Social',
						value: 'social',
						action: 'Social',
						description: 'Publish and manage scheduled posts on Instagram, TikTok, YouTube, and X',
					},
				],
				default: 'social',
				displayOptions: {
					show: {
						resource: ['social'],
					},
				},
			},
			...socialFields,
			// ── Job ────────────────────────────────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['job'],
					},
				},
				options: [
					{
						name: 'Get Status',
						value: 'getStatus',
						action: 'Get job status',
						description: 'Retrieve current job status, progress, and completion data',
					},
					{
						name: 'Get Result',
						value: 'getResult',
						action: 'Get job result',
						description: 'Get the result of a completed job',
					},
					{
						name: 'Delete',
						value: 'deleteJob',
						action: 'Delete a job',
						description: 'Remove a job and its associated output file',
					},
				],
				default: 'getStatus',
			},
			{
				displayName: 'Job ID',
				name: 'jobId',
				type: 'string',
				default: '',
				required: true,
				description: 'The ID of the job to act on',
				displayOptions: {
					show: {
						resource: ['job'],
					},
				},
			},
		],
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const credentials = await this.getCredentials('eranolApi');
		const apiKey = credentials.apiKey as string;
		const authHeaders = { 'x-api-key': apiKey };
		const httpRequest = this.helpers.httpRequest.bind(this);
		const node = this.getNode();

		// Wrap httpRequest so a failed HTTP request surfaces the API's status and
		// response body through n8n's NodeApiError, which the UI renders with the
		// full HTTP context instead of a circular response object.
		const request = async (options: IHttpRequestOptions): Promise<unknown> => {
			try {
				return await httpRequest(options);
			} catch (error) {
				throw new NodeApiError(node, error as JsonObject);
			}
		};

		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;

			let responseData: unknown;

			if (resource === 'job') {
				const operation = this.getNodeParameter('operation', i) as string;
				const jobId = this.getNodeParameter('jobId', i) as string;

				if (operation === 'getStatus') {
					responseData = await request({
						method: 'GET',
						url: `${BASE_URL}/ffmpeg/status/${jobId}`,
						headers: { Accept: 'application/json', ...authHeaders },
						json: true,
					});
				} else if (operation === 'getResult') {
					responseData = await request({
						method: 'GET',
						url: `${BASE_URL}/ffmpeg/result/${jobId}`,
						headers: { Accept: 'application/json', ...authHeaders },
						json: true,
					});
				} else if (operation === 'deleteJob') {
					responseData = await request({
						method: 'DELETE',
						url: `${BASE_URL}/ffmpeg/jobs/${jobId}`,
						headers: { Accept: 'application/json', ...authHeaders },
						json: true,
					});
				} else {
					throw new NodeOperationError(this.getNode(), `Unknown job operation: ${operation}`);
				}
			} else if (resource === 'social') {
				// ── Social: structured per-platform publish/list/cancel/status ───
				const platform = this.getNodeParameter('platform', i) as SocialPlatform;
				const socialOperation = this.getNodeParameter('socialOperation', i) as SocialOperation;

				const scheduledPostId =
					socialOperation === 'cancelScheduled'
						? (this.getNodeParameter('scheduledPostId', i) as string)
						: undefined;
				const route = getSocialRoute(platform, socialOperation, scheduledPostId);

				let body: IDataObject | undefined;
				let qs: IDataObject | undefined;
				if (socialOperation === 'publish') {
					const rawParams: IDataObject = {
						mediaUrl: this.getNodeParameter('mediaUrl', i, '') as string,
						mediaType: this.getNodeParameter('mediaType', i, '') as string,
						caption: this.getNodeParameter('caption', i, '') as string,
						shareToFeed: this.getNodeParameter('shareToFeed', i, true) as boolean,
						videoUrl: this.getNodeParameter('videoUrl', i, '') as string,
						title: this.getNodeParameter('title', i, '') as string,
						privacyLevel: this.getNodeParameter('privacyLevel', i, '') as string,
						disableDuet: this.getNodeParameter('disableDuet', i, false) as boolean,
						disableStitch: this.getNodeParameter('disableStitch', i, false) as boolean,
						disableComment: this.getNodeParameter('disableComment', i, false) as boolean,
						privacyStatus: this.getNodeParameter('privacyStatus', i, '') as string,
						description: this.getNodeParameter('description', i, '') as string,
						tags: this.getNodeParameter('tags', i, '') as string,
						categoryId: this.getNodeParameter('categoryId', i, '') as string,
						madeForKids: this.getNodeParameter('madeForKids', i, false) as boolean,
						text: this.getNodeParameter('text', i, '') as string,
						mediaUrls: this.getNodeParameter('mediaUrls', i, '') as string,
						scheduledFor: this.getNodeParameter('scheduledFor', i, '') as string,
					};
					body = buildPublishBody(platform, rawParams);
				} else if (socialOperation === 'getStatus') {
					qs = { publish_id: this.getNodeParameter('publishId', i) as string };
				}

				responseData = await request({
					method: route.method,
					url: `${BASE_URL}${route.url}`,
					headers: {
						Accept: 'application/json',
						...(body ? { 'Content-Type': 'application/json' } : {}),
						...authHeaders,
					},
					...(body ? { body } : {}),
					...(qs ? { qs } : {}),
					json: true,
				});
			} else {
				// ── Universal: POST with a user-supplied JSON body ───────────────
				const eranolAction = this.getNodeParameter('eranolAction', i) as string;
				const route = OPERATION_BY_VALUE[eranolAction];
				if (!route) {
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${eranolAction}`);
				}

				const rawBody = this.getNodeParameter(`body_${eranolAction}`, i, '{}');
				let body: IDataObject;
				if (typeof rawBody === 'string') {
					try {
						body = JSON.parse(rawBody || '{}') as IDataObject;
					} catch (error) {
						throw new NodeOperationError(
							this.getNode(),
							`Body is not valid JSON: ${(error as Error).message}`,
							{ itemIndex: i },
						);
					}
				} else {
					body = rawBody as IDataObject;
				}

				responseData = await request({
					method: route.method,
					url: `${BASE_URL}${route.url}`,
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						...authHeaders,
					},
					body,
					json: true,
				});
			}

			// Normalise to a JSON-safe value. httpRequest can hand back a full
			// response wrapper (with circular socket refs) when the body is not
			// JSON; strip it down to the parsed body or a plain wrapper.
			const safeData = toJsonSafe(responseData);

			const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray(safeData),
				{ itemData: { item: i } },
			);
			returnData.push(...executionData);
		}

		return [returnData];
	}
}
