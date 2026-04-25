import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['watermark'],
	},
};

export const watermarkDescription: INodeProperties[] = [
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
				operation: ['watermark'],
				useJsonBody: [true],
			},
		},
		description: 'The JSON body to send with the request',
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
				operation: ['watermark'],
				useJsonBody: [false],
			},
		},
		description: 'URL of the video to watermark',
	},
	{
		displayName: 'Watermark URL',
		name: 'watermarkUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['watermark'],
				useJsonBody: [false],
			},
		},
		description: 'URL of the watermark/logo image',
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
				operation: ['watermark'],
				useJsonBody: [false],
			},
		},
		options: [
			{
				displayName: 'Position',
				name: 'position',
				type: 'options',
				default: 'bottom-right',
				options: [
					{ name: 'Bottom Left', value: 'bottom-left' },
					{ name: 'Bottom Right', value: 'bottom-right' },
					{ name: 'Center', value: 'center' },
					{ name: 'Top Left', value: 'top-left' },
					{ name: 'Top Right', value: 'top-right' },
				],
				description: 'Position of the watermark',
			},
			{
				displayName: 'Scale',
				name: 'scale',
				type: 'number',
				typeOptions: { numberPrecision: 2 },
				default: 0.2,
				description: 'Scale factor for the watermark',
			},
			{
				displayName: 'Opacity',
				name: 'opacity',
				type: 'number',
				typeOptions: { minValue: 0, maxValue: 1, numberPrecision: 2 },
				default: 0.8,
				description: 'Opacity of the watermark (0-1)',
			},
			{
				displayName: 'Margin',
				name: 'margin',
				type: 'number',
				default: 10,
				description: 'Margin from the edge in pixels',
			},
		],
	},
];
