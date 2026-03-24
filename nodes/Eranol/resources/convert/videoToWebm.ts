import type { INodeProperties } from 'n8n-workflow';

export const videoToWebmDescription: INodeProperties[] = [
	{
		displayName: 'Send as JSON',
		name: 'useJsonBody',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['convert'],
				operation: ['videoToWebm'],
			},
		},
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
				resource: ['convert'],
				operation: ['videoToWebm'],
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
		displayName: 'File URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['convert'],
				operation: ['videoToWebm'],
				useJsonBody: [false],
			},
		},
		description: 'URL of the video file to convert to WebM',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
];
