import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['compose'],
		operation: ['concat'],
	},
};

export const concatDescription: INodeProperties[] = [
	{
		displayName: 'Clips',
		name: 'clips',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		default: {},
		displayOptions,
		description: 'Video clips to concatenate in order',
		options: [
			{
				name: 'clipValues',
				displayName: 'Clip',
				values: [
					{
						displayName: 'Video URL',
						name: 'url',
						type: 'string',
						default: '',
						required: true,
						description: 'URL of the video clip (mp4, webm, avi, mkv, mov, etc.)',
					},
					{
						displayName: 'Order',
						name: 'order',
						type: 'number',
						default: 1,
						required: true,
						description: 'Position of this clip in the final video (1 = first)',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'clips',
				value: '={{$value.clipValues}}',
			},
		},
	},
];
