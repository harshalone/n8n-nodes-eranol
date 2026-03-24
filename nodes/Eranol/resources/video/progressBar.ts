import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['progressBar'],
	},
};

export const progressBarDescription: INodeProperties[] = [
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
				resource: ['video'],
				operation: ['progressBar'],
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
		displayName: 'Video URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['progressBar'],
				useJsonBody: [false],
			},
		},
		description: 'URL of the video to add a progress bar to',
		routing: {
			send: {
				type: 'body',
				property: 'url',
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
				resource: ['video'],
				operation: ['progressBar'],
				useJsonBody: [false],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#FF0000',
				description: 'Color of the progress bar (hex format)',
				routing: {
					send: {
						type: 'body',
						property: 'color',
					},
				},
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 5,
				description: 'Height of the progress bar in pixels',
				routing: {
					send: {
						type: 'body',
						property: 'height',
					},
				},
			},
			{
				displayName: 'Opacity',
				name: 'opacity',
				type: 'number',
				typeOptions: { minValue: 0, maxValue: 1, numberPrecision: 2 },
				default: 1,
				description: 'Opacity of the progress bar (0-1)',
				routing: {
					send: {
						type: 'body',
						property: 'opacity',
					},
				},
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'options',
				default: 'bottom',
				options: [
					{ name: 'Top', value: 'top' },
					{ name: 'Bottom', value: 'bottom' },
				],
				description: 'Position of the progress bar',
				routing: {
					send: {
						type: 'body',
						property: 'position',
					},
				},
			},
			{
				displayName: 'Style',
				name: 'style',
				type: 'options',
				default: 'grow',
				options: [
					{ name: 'Grow', value: 'grow' },
					{ name: 'Shrink', value: 'shrink' },
				],
				description: 'Progress bar animation style',
				routing: {
					send: {
						type: 'body',
						property: 'style',
					},
				},
			},
		],
	},
];
