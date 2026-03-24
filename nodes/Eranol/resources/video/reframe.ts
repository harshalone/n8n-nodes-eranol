import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['reframe'],
	},
};

export const reframeDescription: INodeProperties[] = [
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
				operation: ['reframe'],
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
				operation: ['reframe'],
				useJsonBody: [false],
			},
		},
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
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['reframe'],
				useJsonBody: [false],
			},
		},
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
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['reframe'],
				useJsonBody: [false],
			},
		},
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
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['reframe'],
				useJsonBody: [false],
			},
		},
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
