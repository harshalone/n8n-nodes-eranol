import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['watermark'],
	},
};

export const watermarkDescription: INodeProperties[] = [
	{
		displayName: 'Video URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the video to watermark',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
	{
		displayName: 'Watermark URL',
		name: 'watermarkUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the watermark/logo image',
		routing: {
			send: {
				type: 'body',
				property: 'watermark_url',
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
				routing: {
					send: {
						type: 'body',
						property: 'position',
					},
				},
			},
			{
				displayName: 'Scale',
				name: 'scale',
				type: 'number',
				typeOptions: { numberPrecision: 2 },
				default: 0.2,
				description: 'Scale factor for the watermark',
				routing: {
					send: {
						type: 'body',
						property: 'scale',
					},
				},
			},
			{
				displayName: 'Opacity',
				name: 'opacity',
				type: 'number',
				typeOptions: { minValue: 0, maxValue: 1, numberPrecision: 2 },
				default: 0.8,
				description: 'Opacity of the watermark (0-1)',
				routing: {
					send: {
						type: 'body',
						property: 'opacity',
					},
				},
			},
			{
				displayName: 'Margin',
				name: 'margin',
				type: 'number',
				default: 10,
				description: 'Margin from the edge in pixels',
				routing: {
					send: {
						type: 'body',
						property: 'margin',
					},
				},
			},
		],
	},
];
