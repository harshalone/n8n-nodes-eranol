import type { INodeProperties } from 'n8n-workflow';

export const videoToMp4Description: INodeProperties[] = [
	{
		displayName: 'File URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['convert'],
				operation: ['videoToMp4'],
			},
		},
		description: 'URL of the video file to convert to MP4',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
];
