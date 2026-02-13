import type { INodeProperties } from 'n8n-workflow';

export const videoToWebmDescription: INodeProperties[] = [
	{
		displayName: 'File URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['convert'],
				operation: ['videoToWebm'],
			},
		},
		description: 'URL of the video file to convert to WebM',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
];
