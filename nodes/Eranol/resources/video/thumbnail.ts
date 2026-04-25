import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['thumbnail'],
	},
};

export const thumbnailDescription: INodeProperties[] = [
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
				operation: ['thumbnail'],
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
				operation: ['thumbnail'],
				useJsonBody: [false],
			},
		},
		description: 'URL of the video to create a thumbnail from',
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
				operation: ['thumbnail'],
				useJsonBody: [false],
			},
		},
		options: [
			{
				displayName: 'Background Color',
				name: 'bgColor',
				type: 'color',
				default: '',
				description: 'Background color behind text (hex format)',
			},
			{
				displayName: 'Font Color',
				name: 'fontColor',
				type: 'color',
				default: '#FFFFFF',
				description: 'Color of the text overlay (hex format)',
			},
			{
				displayName: 'Font Size',
				name: 'fontSize',
				type: 'number',
				default: 48,
				description: 'Font size for the text overlay',
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 720,
				description: 'Height of the thumbnail in pixels',
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
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				default: '',
				description: 'Text overlay to add to the thumbnail',
			},
			{
				displayName: 'Time (Seconds)',
				name: 'timeSec',
				type: 'number',
				default: 0,
				description: 'Time position to capture the frame',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 1280,
				description: 'Width of the thumbnail in pixels',
			},
		],
	},
];
