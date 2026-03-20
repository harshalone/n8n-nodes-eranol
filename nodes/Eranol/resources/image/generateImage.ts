import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['image'],
		operation: ['generateImage'],
	},
};

export const generateImageDescription: INodeProperties[] = [
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
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
		displayOptions,
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
