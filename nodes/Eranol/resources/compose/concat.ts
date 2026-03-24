import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['compose'],
		operation: ['concat'],
	},
};

export const concatDescription: INodeProperties[] = [
	{
		displayName: 'Send as JSON',
		name: 'useJsonBody',
		type: 'boolean',
		default: false,
		displayOptions,
		description: 'Whether to send the request body as raw JSON instead of using individual fields',
		noDataExpression: true,
	},
	{
		displayName: 'JSON Body',
		name: 'jsonBody',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				resource: ['compose'],
				operation: ['concat'],
				useJsonBody: [true],
			},
		},
		description: 'The JSON body to send with the request',
		routing: {
			send: {
				type: 'body',
				value: '={{JSON.parse($value)}}',
			},
		},
	},
	{
		displayName: 'Clips',
		name: 'clips',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['compose'],
				operation: ['concat'],
				useJsonBody: [false],
			},
		},
		description: 'Video clips to concatenate in order',
		options: [
			{
				name: 'clipValues',
				displayName: 'Clip',
				values: [
					{
						displayName: 'Video URL',
						name: 'url',
						type: 'string',
						default: '',
						required: true,
						description: 'URL of the video clip (mp4, webm, avi, mkv, mov, etc.)',
					},
					{
						displayName: 'Order',
						name: 'order',
						type: 'number',
						default: 1,
						required: true,
						description: 'Position of this clip in the final video (1 = first)',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'clips',
				value: '={{$value.clipValues}}',
			},
		},
	},
];
