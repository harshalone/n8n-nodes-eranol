import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['image'],
		operation: ['generateImage'],
	},
};

export const generateImageDescription: INodeProperties[] = [
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
				resource: ['image'],
				operation: ['generateImage'],
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
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['generateImage'],
				useJsonBody: [false],
			},
		},
		description: 'Text prompt describing the image to generate',
		routing: {
			send: {
				type: 'body',
				property: 'prompt',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['generateImage'],
				useJsonBody: [false],
			},
		},
		options: [
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 768,
				description: 'Output image height in pixels',
				routing: {
					send: {
						type: 'body',
						property: 'height',
					},
				},
			},
			{
				displayName: 'Negative Prompt',
				name: 'negativePrompt',
				type: 'string',
				default: '',
				description: 'Text describing what to exclude from the image',
				routing: {
					send: {
						type: 'body',
						property: 'negative_prompt',
					},
				},
			},
			{
				displayName: 'Seed',
				name: 'seed',
				type: 'number',
				default: 42,
				description: 'Random seed for reproducibility',
				routing: {
					send: {
						type: 'body',
						property: 'seed',
					},
				},
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 512,
				description: 'Output image width in pixels',
				routing: {
					send: {
						type: 'body',
						property: 'width',
					},
				},
			},
		],
	},
];
