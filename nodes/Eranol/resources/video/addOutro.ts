import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['addOutro'],
	},
};

export const addOutroDescription: INodeProperties[] = [
	{
		displayName: 'Video URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the main video',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
	{
		displayName: 'Outro URL',
		name: 'outroUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the outro clip to append',
		routing: {
			send: {
				type: 'body',
				property: 'outro_url',
			},
		},
	},
];
