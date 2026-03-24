import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['compose'],
		operation: ['composeVideo'],
	},
};

export const composeVideoDescription: INodeProperties[] = [
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
				resource: ['compose'],
				operation: ['composeVideo'],
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
		displayName: 'Main Video URL',
		name: 'mainVideoUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['compose'],
				operation: ['composeVideo'],
				useJsonBody: [false],
			},
		},
		description: 'URL of the main/base video',
		routing: {
			send: {
				type: 'body',
				property: 'main_video_url',
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
		displayOptions: {
			show: {
				resource: ['compose'],
				operation: ['composeVideo'],
				useJsonBody: [false],
			},
		},
		description: 'Video or image segments to overlay onto the main video at specific time ranges',
		options: [
			{
				name: 'overlayValues',
				displayName: 'Overlay',
				values: [
					{
						displayName: 'URL',
						name: 'url',
						type: 'string',
						default: '',
						required: true,
						description: 'URL of the video or image to overlay',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						default: 'video',
						options: [
							{ name: 'Video', value: 'video' },
							{ name: 'Image', value: 'image' },
						],
						description: 'Type of the overlay media',
					},
					{
						displayName: 'Start Time (Seconds)',
						name: 'start_time',
						type: 'number',
						default: 0,
						required: true,
						description: 'When the overlay starts in the main video (seconds)',
					},
					{
						displayName: 'End Time (Seconds)',
						name: 'end_time',
						type: 'number',
						default: 5,
						required: true,
						description: 'When the overlay ends in the main video (seconds)',
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
