import type { INodeProperties } from 'n8n-workflow';
import { mergeDescription } from './merge';
import { concatDescription } from './concat';
import { composeVideoDescription } from './composeVideo';

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
				name: 'Concat',
				value: 'concat',
				action: 'Concatenate videos',
				description: 'Merge video clips in order into a single video',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/video/concat',
					},
				},
			},
			{
				name: 'Compose Video',
				value: 'composeVideo',
				action: 'Compose video with overlays',
				description: 'Overlay video or image segments onto a main video at specific time ranges',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/video/compose',
					},
				},
			},
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
	...concatDescription,
	...composeVideoDescription,
	...mergeDescription,
];
