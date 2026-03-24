import type { INodeProperties } from 'n8n-workflow';
import { generateImageDescription } from './generateImage';
import { imageStatusDescription } from './imageStatus';

export const imageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['image'],
			},
		},
		options: [
			{
				name: 'Generate Image',
				value: 'generateImage',
				action: 'Generate image with AI',
				description: 'Generate an image using AI from a text prompt',
				routing: {
					request: {
						method: 'POST',
						url: '/image',
						headers: { 'Content-Type': 'application/json' },
					},
				},
			},
			{
				name: 'Get Image Status',
				value: 'imageStatus',
				action: 'Get image generation status',
				description: 'Check the status of an image generation job',
				routing: {
					request: {
						method: 'GET',
						url: '=/image/status/{{$parameter.jobId}}',
					},
				},
			},
		],
		default: 'generateImage',
	},
	...generateImageDescription,
	...imageStatusDescription,
];
