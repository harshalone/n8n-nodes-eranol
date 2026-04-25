import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['caption'],
	},
};

export const captionDescription: INodeProperties[] = [
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
				operation: ['caption'],
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
				operation: ['caption'],
				useJsonBody: [false],
			},
		},
		description: 'URL of the video to caption',
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
				operation: ['caption'],
				useJsonBody: [false],
			},
		},
		options: [
			{
				displayName: 'Font Color',
				name: 'fontColor',
				type: 'color',
				default: '#FFFFFF',
				description: 'Color of the caption text (hex format)',
			},
			{
				displayName: 'Font Size',
				name: 'fontSize',
				type: 'number',
				typeOptions: { minValue: 8, maxValue: 120 },
				default: 24,
				description: 'Font size for the captions (8-120)',
			},
			{
				displayName: 'Max Segment Duration',
				name: 'maxSegmentDuration',
				type: 'number',
				default: 5,
				description: 'Maximum duration of each caption segment in seconds',
			},
			{
				displayName: 'Max Words Per Line',
				name: 'maxWordsPerLine',
				type: 'number',
				default: 7,
				description: 'Maximum number of words per caption line',
			},
			{
				displayName: 'Outline Color',
				name: 'outlineColor',
				type: 'color',
				default: '#000000',
				description: 'Color of the text outline (hex format)',
			},
			{
				displayName: 'Outline Width',
				name: 'outlineWidth',
				type: 'number',
				default: 2,
				description: 'Width of the text outline',
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
			},
		],
	},
];
