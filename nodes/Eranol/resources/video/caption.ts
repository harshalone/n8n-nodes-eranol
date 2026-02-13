import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['caption'],
	},
};

export const captionDescription: INodeProperties[] = [
	{
		displayName: 'Video URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the video to caption',
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
				displayName: 'Font Color',
				name: 'fontColor',
				type: 'color',
				default: '#FFFFFF',
				description: 'Color of the caption text (hex format)',
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
				typeOptions: { minValue: 8, maxValue: 120 },
				default: 24,
				description: 'Font size for the captions (8-120)',
				routing: {
					send: {
						type: 'body',
						property: 'font_size',
					},
				},
			},
			{
				displayName: 'Max Segment Duration',
				name: 'maxSegmentDuration',
				type: 'number',
				default: 5,
				description: 'Maximum duration of each caption segment in seconds',
				routing: {
					send: {
						type: 'body',
						property: 'max_segment_duration',
					},
				},
			},
			{
				displayName: 'Max Words Per Line',
				name: 'maxWordsPerLine',
				type: 'number',
				default: 7,
				description: 'Maximum number of words per caption line',
				routing: {
					send: {
						type: 'body',
						property: 'max_words_per_line',
					},
				},
			},
			{
				displayName: 'Outline Color',
				name: 'outlineColor',
				type: 'color',
				default: '#000000',
				description: 'Color of the text outline (hex format)',
				routing: {
					send: {
						type: 'body',
						property: 'outline_color',
					},
				},
			},
			{
				displayName: 'Outline Width',
				name: 'outlineWidth',
				type: 'number',
				default: 2,
				description: 'Width of the text outline',
				routing: {
					send: {
						type: 'body',
						property: 'outline_width',
					},
				},
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'options',
				default: 'bottom',
				options: [
					{ name: 'Bottom', value: 'bottom' },
					{ name: 'Top', value: 'top' },
					{ name: 'Center', value: 'center' },
				],
				description: 'Position of the captions on the video',
				routing: {
					send: {
						type: 'body',
						property: 'position',
					},
				},
			},

		],
	},
];
