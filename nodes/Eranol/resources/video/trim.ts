import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['trim'],
	},
};

export const trimDescription: INodeProperties[] = [
	{
		displayName: 'Video URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the video to trim',
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
		description: 'End time in seconds',
		routing: {
			send: {
				type: 'body',
				property: 'end_sec',
			},
		},
	},
];
