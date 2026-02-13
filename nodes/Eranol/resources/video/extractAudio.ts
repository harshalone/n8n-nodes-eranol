import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['extractAudio'],
	},
};

export const extractAudioDescription: INodeProperties[] = [
	{
		displayName: 'Video URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the video to extract audio from',
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
				displayName: 'Mono',
				name: 'mono',
				type: 'boolean',
				default: true,
				description: 'Whether to extract audio as mono',
				routing: {
					send: {
						type: 'body',
						property: 'mono',
					},
				},
			},
		],
	},
];
