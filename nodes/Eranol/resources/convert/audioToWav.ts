import type { INodeProperties } from 'n8n-workflow';

export const audioToWavDescription: INodeProperties[] = [
	{
		displayName: 'File URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['convert'],
				operation: ['audioToWav'],
			},
		},
		description: 'URL of the audio file to convert to WAV',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
];
