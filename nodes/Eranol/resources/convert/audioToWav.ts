import type { INodeProperties } from 'n8n-workflow';

export const audioToWavDescription: INodeProperties[] = [
	{
		displayName: 'Send as JSON',
		name: 'useJsonBody',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['convert'],
				operation: ['audioToWav'],
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
				operation: ['audioToWav'],
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
				operation: ['audioToWav'],
				useJsonBody: [false],
			},
		},
		description: 'URL of the audio file to convert to WAV',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
];
