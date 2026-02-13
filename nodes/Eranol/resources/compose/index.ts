import type { INodeProperties } from 'n8n-workflow';
import { mergeDescription } from './merge';

export const composeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['compose'],
			},
		},
		options: [
			{
				name: 'Merge',
				value: 'merge',
				action: 'Merge images and audio into video',
				description: 'Combine image slides with audio into a video',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/merge',
					},
				},
			},
		],
		default: 'merge',
	},
	...mergeDescription,
];
