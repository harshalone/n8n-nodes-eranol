import type { INodeProperties } from 'n8n-workflow';

export const audioToMp3Description: INodeProperties[] = [
	{
		displayName: 'File URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['convert'],
				operation: ['audioToMp3'],
			},
		},
		description: 'URL of the audio file to convert to MP3',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
];
