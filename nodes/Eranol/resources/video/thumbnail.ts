import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['thumbnail'],
	},
};

export const thumbnailDescription: INodeProperties[] = [
	{
		displayName: 'Video URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the video to create a thumbnail from',
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
		displayOptions,
		options: [
			{
				displayName: 'Background Color',
				name: 'bgColor',
				type: 'color',
				default: '',
				description: 'Background color behind text (hex format)',
				routing: {
					send: {
						type: 'body',
						property: 'bg_color',
					},
				},
			},
			{
				displayName: 'Font Color',
				name: 'fontColor',
				type: 'color',
				default: '#FFFFFF',
				description: 'Color of the text overlay (hex format)',
				routing: {
					send: {
						type: 'body',
						property: 'font_color',
					},
				},
			},
			{
				displayName: 'Font Size',
				name: 'fontSize',
				type: 'number',
				default: 48,
				description: 'Font size for the text overlay',
				routing: {
					send: {
						type: 'body',
						property: 'font_size',
					},
				},
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 720,
				description: 'Height of the thumbnail in pixels',
				routing: {
					send: {
						type: 'body',
						property: 'height',
					},
				},
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'options',
				default: 'center',
				options: [
					{ name: 'Top', value: 'top' },
					{ name: 'Center', value: 'center' },
					{ name: 'Bottom', value: 'bottom' },
				],
				description: 'Position of the text overlay',
				routing: {
					send: {
						type: 'body',
						property: 'position',
					},
				},
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				default: '',
				description: 'Text overlay to add to the thumbnail',
				routing: {
					send: {
						type: 'body',
						property: 'text',
					},
				},
			},
			{
				displayName: 'Time (Seconds)',
				name: 'timeSec',
				type: 'number',
				default: 0,
				description: 'Time position to capture the frame',
				routing: {
					send: {
						type: 'body',
						property: 'time_sec',
					},
				},
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 1280,
				description: 'Width of the thumbnail in pixels',
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
