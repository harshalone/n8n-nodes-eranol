import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['addIntro'],
	},
};

export const addIntroDescription: INodeProperties[] = [
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
		displayName: 'Intro URL',
		name: 'introUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the intro clip to prepend',
		routing: {
			send: {
				type: 'body',
				property: 'intro_url',
			},
		},
	},
];
