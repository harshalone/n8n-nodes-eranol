import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['generateGif'],
	},
};

export const generateGifDescription: INodeProperties[] = [
	{
		displayName: 'Video URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the video to create GIF from',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
	{
		displayName: 'Start (Seconds)',
		name: 'startSec',
		type: 'number',
		required: true,
		default: 0,
		displayOptions,
		description: 'Start time in seconds',
		routing: {
			send: {
				type: 'body',
				property: 'start_sec',
			},
		},
	},
	{
		displayName: 'End (Seconds)',
		name: 'endSec',
		type: 'number',
		required: true,
		default: 10,
		displayOptions,
		description: 'End time in seconds (max 60s segment)',
		routing: {
			send: {
				type: 'body',
				property: 'end_sec',
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
				displayName: 'FPS',
				name: 'fps',
				type: 'number',
				default: 10,
				description: 'Frames per second for the GIF',
				routing: {
					send: {
						type: 'body',
						property: 'fps',
					},
				},
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 320,
				description: 'Width of the GIF in pixels',
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
