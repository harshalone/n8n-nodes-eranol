import type { INodeProperties } from 'n8n-workflow';

export const imageToJpgDescription: INodeProperties[] = [
	{
		displayName: 'File URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['convert'],
				operation: ['imageToJpg'],
			},
		},
		description: 'URL of the image file to convert to JPG',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
];
