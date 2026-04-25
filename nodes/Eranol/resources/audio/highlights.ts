import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['audio'],
		operation: ['highlights'],
	},
};

export const highlightsDescription: INodeProperties[] = [
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
				resource: ['audio'],
				operation: ['highlights'],
				useJsonBody: [true],
			},
		},
		description: 'The JSON body to send with the request',
	},
	{
		displayName: 'Audio URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['audio'],
				operation: ['highlights'],
				useJsonBody: [false],
			},
		},
		description: 'URL of the audio file to extract highlights from',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['audio'],
				operation: ['highlights'],
				useJsonBody: [false],
			},
		},
		options: [
			{
				displayName: 'Top N',
				name: 'topN',
				type: 'number',
				default: 5,
				description: 'Number of top highlights to extract',
			},
			{
				displayName: 'Clip Duration',
				name: 'clipDuration',
				type: 'number',
				default: 10,
				description: 'Duration of each highlight clip in seconds',
			},
		],
	},
];
