import type { INodeProperties } from 'n8n-workflow';
import { denoiseDescription } from './denoise';
import { removeSilenceDescription } from './removeSilence';
import { highlightsDescription } from './highlights';

export const audioDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['audio'],
			},
		},
		options: [
			{
				name: 'Denoise',
				value: 'denoise',
				action: 'Denoise audio',
				description: 'Remove background noise from audio',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/audio/denoise',
					},
				},
			},
			{
				name: 'Highlights',
				value: 'highlights',
				action: 'Extract audio highlights',
				description: 'Extract the loudest segments based on RMS energy',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/audio/highlights',
					},
				},
			},
			{
				name: 'Remove Silence',
				value: 'removeSilence',
				action: 'Remove silence from audio',
				description: 'Detect and eliminate quiet gaps in audio',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/audio/remove-silence',
					},
				},
			},
		],
		default: 'denoise',
	},
	...denoiseDescription,
	...removeSilenceDescription,
	...highlightsDescription,
];
