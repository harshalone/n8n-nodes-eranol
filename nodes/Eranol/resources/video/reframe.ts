import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['reframe'],
	},
};

export const reframeDescription: INodeProperties[] = [
	{
		displayName: 'Video URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the video to reframe',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
	{
		displayName: 'Width',
		name: 'width',
		type: 'number',
		required: true,
		default: 1920,
		displayOptions,
		description: 'Target width in pixels',
		routing: {
			send: {
				type: 'body',
				property: 'width',
			},
		},
	},
	{
		displayName: 'Height',
		name: 'height',
		type: 'number',
		required: true,
		default: 1080,
		displayOptions,
		description: 'Target height in pixels',
		routing: {
			send: {
				type: 'body',
				property: 'height',
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
				displayName: 'Background Color',
				name: 'bgColor',
				type: 'color',
				default: '#000000',
				description: 'Color for padding areas (hex format)',
				routing: {
					send: {
						type: 'body',
						property: 'bg_color',
					},
				},
			},
		],
	},
];
