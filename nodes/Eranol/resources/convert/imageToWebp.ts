import type { INodeProperties } from 'n8n-workflow';

export const imageToWebpDescription: INodeProperties[] = [
	{
		displayName: 'File URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['convert'],
				operation: ['imageToWebp'],
			},
		},
		description: 'URL of the image file to convert to WebP',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
];
