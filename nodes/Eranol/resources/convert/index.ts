import type { INodeProperties } from 'n8n-workflow';
import { videoToMp4Description } from './videoToMp4';
import { videoToWebmDescription } from './videoToWebm';
import { audioToMp3Description } from './audioToMp3';
import { audioToWavDescription } from './audioToWav';
import { imageToJpgDescription } from './imageToJpg';
import { imageToWebpDescription } from './imageToWebp';

export const convertDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['convert'],
			},
		},
		options: [
			{
				name: 'Audio to MP3',
				value: 'audioToMp3',
				action: 'Convert audio to MP3',
				description: 'Convert an audio file to MP3 format',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/convert/audio/to/mp3',
					},
				},
			},
			{
				name: 'Audio to WAV',
				value: 'audioToWav',
				action: 'Convert audio to WAV',
				description: 'Convert an audio file to WAV format',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/convert/audio/to/wav',
					},
				},
			},
			{
				name: 'Image to JPG',
				value: 'imageToJpg',
				action: 'Convert image to JPG',
				description: 'Convert an image file to JPG format',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/convert/image/to/jpg',
					},
				},
			},
			{
				name: 'Image to WebP',
				value: 'imageToWebp',
				action: 'Convert image to web p',
				description: 'Convert an image file to WebP format',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/convert/image/to/webp',
					},
				},
			},
			{
				name: 'Video to MP4',
				value: 'videoToMp4',
				action: 'Convert video to MP4',
				description: 'Convert a video file to MP4 format',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/convert/video/to/mp4',
					},
				},
			},
			{
				name: 'Video to WebM',
				value: 'videoToWebm',
				action: 'Convert video to web m',
				description: 'Convert a video file to WebM format (VP9 + Opus)',
				routing: {
					request: {
						method: 'POST',
						url: '/ffmpeg/convert/video/to/webm',
					},
				},
			},
		],
		default: 'videoToMp4',
	},
	...videoToMp4Description,
	...videoToWebmDescription,
	...audioToMp3Description,
	...audioToWavDescription,
	...imageToJpgDescription,
	...imageToWebpDescription,
];
