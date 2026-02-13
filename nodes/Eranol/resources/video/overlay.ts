import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['overlay'],
	},
};

export const overlayDescription: INodeProperties[] = [
	{
		displayName: 'Video URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the video to add overlays to',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
	{
		displayName: 'Overlays',
		name: 'overlays',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		default: {},
		displayOptions,
		description: 'Overlays to add to the video',
		options: [
			{
				name: 'overlayValues',
				displayName: 'Overlay',
				values: [
					{
						displayName: 'Content',
						name: 'content',
						type: 'string',
						default: '',
						description: 'Text content or image URL for the overlay',
					},
					{
						displayName: 'End (Seconds)',
						name: 'end_sec',
						type: 'number',
						default: 10,
						description: 'When the overlay disappears (seconds)',
					},
					{
						displayName: 'Font Color',
						name: 'font_color',
						type: 'color',
						default: '#FFFFFF',
						description: 'Font color for text overlays (hex format)',
					},
					{
						displayName: 'Font Size',
						name: 'font_size',
						type: 'number',
						default: 24,
						description: 'Font size for text overlays',
					},
					{
						displayName: 'Opacity',
						name: 'opacity',
						type: 'number',
						default: 1,
						description: 'Opacity of the overlay (0-1)',
					},
					{
						displayName: 'Scale',
						name: 'scale',
						type: 'number',
						default: 1,
						description: 'Scale factor for image overlays',
					},
					{
						displayName: 'Start (Seconds)',
						name: 'start_sec',
						type: 'number',
						default: 0,
						description: 'When the overlay appears (seconds)',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						default: 'text',
						options: [
							{
								name: 'Text',
								value: 'text',
							},
							{
								name: 'Image',
								value: 'image',
							},
						],
						description: 'Type of overlay',
					},
					{
						displayName: 'X Position',
						name: 'x',
						type: 'number',
						default: 0,
						description: 'Horizontal position in pixels',
					},
					{
						displayName: 'Y Position',
						name: 'y',
						type: 'number',
						default: 0,
						description: 'Vertical position in pixels',
					},
			],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'overlays',
				value: '={{$value.overlayValues}}',
			},
		},
	},
];
