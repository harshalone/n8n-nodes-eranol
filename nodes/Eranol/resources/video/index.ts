import type { INodeProperties } from 'n8n-workflow';
import { addIntroDescription } from './addIntro';
import { addOutroDescription } from './addOutro';
import { captionDescription } from './caption';
import { trimDescription } from './trim';
import { extractAudioDescription } from './extractAudio';
import { extractImagesDescription } from './extractImages';
import { generateGifDescription } from './generateGif';
import { overlayDescription } from './overlay';
import { watermarkDescription } from './watermark';
import { progressBarDescription } from './progressBar';
import { thumbnailDescription } from './thumbnail';
import { reframeDescription } from './reframe';

export const videoDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['video'],
			},
		},
		options: [
			{
				name: 'Add Intro',
				value: 'addIntro',
				action: 'Add intro to video',
				description: 'Prepend an intro clip to a video',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/video/add-intro',
						headers: { 'Content-Type': 'application/json' },
					},
				},
			},
			{
				name: 'Add Outro',
				value: 'addOutro',
				action: 'Add outro to video',
				description: 'Append an outro clip to a video',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/video/add-outro',
						headers: { 'Content-Type': 'application/json' },
					},
				},
			},
			{
				name: 'Caption',
				value: 'caption',
				action: 'Add captions to video',
				description: 'Generate captions from audio using speech recognition',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/video/caption',
						headers: { 'Content-Type': 'application/json' },
					},
				},
			},
			{
				name: 'Extract Audio',
				value: 'extractAudio',
				action: 'Extract audio from video',
				description: 'Extract the audio track as a WAV file',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/video/extract/audio',
						headers: { 'Content-Type': 'application/json' },
					},
				},
			},
			{
				name: 'Extract Images',
				value: 'extractImages',
				action: 'Extract images from video',
				description: 'Extract frames as PNG images',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/video/extract/images',
						headers: { 'Content-Type': 'application/json' },
					},
				},
			},
			{
				name: 'Generate GIF',
				value: 'generateGif',
				action: 'Generate GIF from video',
				description: 'Create a GIF from a video segment (max 60s)',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/video/extract/gif',
						headers: { 'Content-Type': 'application/json' },
					},
				},
			},
			{
				name: 'Overlay',
				value: 'overlay',
				action: 'Add overlays to video',
				description: 'Add text or image overlays to a video',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/video/overlay',
						headers: { 'Content-Type': 'application/json' },
					},
				},
			},
			{
				name: 'Progress Bar',
				value: 'progressBar',
				action: 'Add progress bar to video',
				description: 'Add an animated progress indicator to a video',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/video/progress-bar',
						headers: { 'Content-Type': 'application/json' },
					},
				},
			},
			{
				name: 'Reframe',
				value: 'reframe',
				action: 'Reframe video',
				description: 'Change the aspect ratio with colored padding',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/video/reframe',
						headers: { 'Content-Type': 'application/json' },
					},
				},
			},
			{
				name: 'Thumbnail',
				value: 'thumbnail',
				action: 'Create video thumbnail',
				description: 'Extract a frame with optional text overlay',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/video/thumbnail',
						headers: { 'Content-Type': 'application/json' },
					},
				},
			},
			{
				name: 'Trim',
				value: 'trim',
				action: 'Trim video',
				description: 'Cut a video segment using lossless stream copy',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/video/trim',
						headers: { 'Content-Type': 'application/json' },
					},
				},
			},
			{
				name: 'Watermark',
				value: 'watermark',
				action: 'Add watermark to video',
				description: 'Overlay a logo or watermark on a video',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/video/watermark',
						headers: { 'Content-Type': 'application/json' },
					},
				},
			},
		],
		default: 'trim',
	},
	...addIntroDescription,
	...addOutroDescription,
	...captionDescription,
	...trimDescription,
	...extractAudioDescription,
	...extractImagesDescription,
	...generateGifDescription,
	...overlayDescription,
	...watermarkDescription,
	...progressBarDescription,
	...thumbnailDescription,
	...reframeDescription,
];
