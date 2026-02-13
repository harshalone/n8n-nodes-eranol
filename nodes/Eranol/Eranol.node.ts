import {
	NodeConnectionTypes,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { videoDescription } from './resources/video';
import { audioDescription } from './resources/audio';
import { convertDescription } from './resources/convert';
import { composeDescription } from './resources/compose';
import { jobDescription } from './resources/job';

export class Eranol implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Eranol',
		name: 'eranol',
		icon: 'file:eranol.svg',

		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Eranol FFmpeg media processing API',
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
		requestDefaults: {
			baseURL: 'https://eranol.com/api/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Audio',
						value: 'audio',
					},
					{
						name: 'Compose',
						value: 'compose',
					},
					{
						name: 'Convert',
						value: 'convert',
					},
					{
						name: 'Job',
						value: 'job',
					},
					{
						name: 'Video',
						value: 'video',
					},
				],
				default: 'video',
			},
			...videoDescription,
			...audioDescription,
			...convertDescription,
			...composeDescription,
			...jobDescription,
		],
		usableAsTool: true,
	};
}
