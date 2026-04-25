import {
	NodeConnectionTypes,
	NodeOperationError,
	type IDataObject,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { videoDescription } from './resources/video';
import { audioDescription } from './resources/audio';
import { convertDescription } from './resources/convert';
import { composeDescription } from './resources/compose';
import { jobDescription } from './resources/job';
import { imageDescription } from './resources/image';
import { notifyDescription } from './resources/notify';

const BASE_URL = 'https://eranol.com/api/v1';

const OPERATION_MAP: Record<string, { method: string; url: string }> = {
	// video
	addIntro:      { method: 'POST', url: '/ffmpeg/video/add-intro' },
	addOutro:      { method: 'POST', url: '/ffmpeg/video/add-outro' },
	caption:       { method: 'POST', url: '/ffmpeg/video/caption' },
	extractAudio:  { method: 'POST', url: '/ffmpeg/video/extract/audio' },
	extractImages: { method: 'POST', url: '/ffmpeg/video/extract/images' },
	generateGif:   { method: 'POST', url: '/ffmpeg/video/extract/gif' },
	overlay:       { method: 'POST', url: '/ffmpeg/video/overlay' },
	progressBar:   { method: 'POST', url: '/ffmpeg/video/progress-bar' },
	reframe:       { method: 'POST', url: '/ffmpeg/video/reframe' },
	thumbnail:     { method: 'POST', url: '/ffmpeg/video/thumbnail' },
	trim:          { method: 'POST', url: '/ffmpeg/video/trim' },
	watermark:     { method: 'POST', url: '/ffmpeg/video/watermark' },
	// audio
	denoise:       { method: 'POST', url: '/ffmpeg/audio/denoise' },
	highlights:    { method: 'POST', url: '/ffmpeg/audio/highlights' },
	removeSilence: { method: 'POST', url: '/ffmpeg/audio/remove-silence' },
	// convert
	audioToMp3:   { method: 'POST', url: '/ffmpeg/convert/audio/to/mp3' },
	audioToWav:   { method: 'POST', url: '/ffmpeg/convert/audio/to/wav' },
	imageToJpg:   { method: 'POST', url: '/ffmpeg/convert/image/to/jpg' },
	imageToWebp:  { method: 'POST', url: '/ffmpeg/convert/image/to/webp' },
	videoToMp4:   { method: 'POST', url: '/ffmpeg/convert/video/to/mp4' },
	videoToWebm:  { method: 'POST', url: '/ffmpeg/convert/video/to/webm' },
	// compose
	concat:       { method: 'POST', url: '/ffmpeg/video/concat' },
	composeVideo: { method: 'POST', url: '/ffmpeg/video/compose' },
	merge:        { method: 'POST', url: '/ffmpeg/merge' },
	// image
	generateImage: { method: 'POST', url: '/image' },
	// notify
	sendEmail: { method: 'POST', url: '/notifications/email' },
};

function buildBody(operation: string, p: (name: string, fallback?: unknown) => unknown): Record<string, unknown> {
	const additional = (p('additionalFields', {}) as Record<string, unknown>);

	switch (operation) {
		// ── video ──────────────────────────────────────────────────────────
		case 'trim':
			return { url: p('url'), start_sec: p('startSec'), end_sec: p('endSec') };
		case 'addIntro':
			return { url: p('url'), intro_url: p('introUrl') };
		case 'addOutro':
			return { url: p('url'), outro_url: p('outroUrl') };
		case 'caption': {
			const body: Record<string, unknown> = { url: p('url') };
			if (additional.fontColor !== undefined)          body.font_color = additional.fontColor;
			if (additional.fontSize !== undefined)           body.font_size = additional.fontSize;
			if (additional.maxSegmentDuration !== undefined) body.max_segment_duration = additional.maxSegmentDuration;
			if (additional.maxWordsPerLine !== undefined)    body.max_words_per_line = additional.maxWordsPerLine;
			if (additional.outlineColor !== undefined)       body.outline_color = additional.outlineColor;
			if (additional.outlineWidth !== undefined)       body.outline_width = additional.outlineWidth;
			if (additional.position !== undefined)           body.position = additional.position;
			return body;
		}
		case 'extractAudio': {
			const body: Record<string, unknown> = { url: p('url') };
			if (additional.mono !== undefined) body.mono = additional.mono;
			return body;
		}
		case 'extractImages': {
			const body: Record<string, unknown> = { url: p('url'), start_sec: p('startSec'), end_sec: p('endSec') };
			if (additional.fps !== undefined) body.fps = additional.fps;
			return body;
		}
		case 'generateGif': {
			const body: Record<string, unknown> = { url: p('url'), start_sec: p('startSec'), end_sec: p('endSec') };
			if (additional.fps !== undefined)   body.fps = additional.fps;
			if (additional.width !== undefined) body.width = additional.width;
			return body;
		}
		case 'overlay': {
			const raw = p('overlays', { overlayValues: [] }) as { overlayValues: unknown[] };
			return { url: p('url'), overlays: raw.overlayValues ?? [] };
		}
		case 'progressBar': {
			const body: Record<string, unknown> = { url: p('url') };
			if (additional.color !== undefined)    body.color = additional.color;
			if (additional.height !== undefined)   body.height = additional.height;
			if (additional.opacity !== undefined)  body.opacity = additional.opacity;
			if (additional.position !== undefined) body.position = additional.position;
			if (additional.style !== undefined)    body.style = additional.style;
			return body;
		}
		case 'reframe': {
			const body: Record<string, unknown> = { url: p('url'), width: p('width'), height: p('height') };
			if (additional.bgColor !== undefined) body.bg_color = additional.bgColor;
			return body;
		}
		case 'thumbnail': {
			const body: Record<string, unknown> = { url: p('url') };
			if (additional.bgColor !== undefined)   body.bg_color = additional.bgColor;
			if (additional.fontColor !== undefined) body.font_color = additional.fontColor;
			if (additional.fontSize !== undefined)  body.font_size = additional.fontSize;
			if (additional.height !== undefined)    body.height = additional.height;
			if (additional.position !== undefined)  body.position = additional.position;
			if (additional.text !== undefined)      body.text = additional.text;
			if (additional.timeSec !== undefined)   body.time_sec = additional.timeSec;
			if (additional.width !== undefined)     body.width = additional.width;
			return body;
		}
		case 'watermark': {
			const body: Record<string, unknown> = { url: p('url'), watermark_url: p('watermarkUrl') };
			if (additional.position !== undefined) body.position = additional.position;
			if (additional.scale !== undefined)    body.scale = additional.scale;
			if (additional.opacity !== undefined)  body.opacity = additional.opacity;
			if (additional.margin !== undefined)   body.margin = additional.margin;
			return body;
		}
		// ── audio ──────────────────────────────────────────────────────────
		case 'denoise': {
			const body: Record<string, unknown> = { url: p('url') };
			if (additional.method !== undefined)         body.method = additional.method;
			if (additional.noiseReduction !== undefined) body.noise_reduction = additional.noiseReduction;
			return body;
		}
		case 'highlights': {
			const body: Record<string, unknown> = { url: p('url') };
			if (additional.topN !== undefined)        body.top_n = additional.topN;
			if (additional.clipDuration !== undefined) body.clip_duration = additional.clipDuration;
			return body;
		}
		case 'removeSilence': {
			const body: Record<string, unknown> = { url: p('url') };
			if (additional.silenceThreshDb !== undefined)    body.silence_thresh_db = additional.silenceThreshDb;
			if (additional.minSilenceDuration !== undefined) body.min_silence_duration = additional.minSilenceDuration;
			if (additional.padding !== undefined)            body.padding = additional.padding;
			return body;
		}
		// ── convert ────────────────────────────────────────────────────────
		case 'audioToMp3':
		case 'audioToWav':
		case 'imageToJpg':
		case 'imageToWebp':
		case 'videoToMp4':
		case 'videoToWebm':
			return { url: p('url') };
		// ── compose ────────────────────────────────────────────────────────
		case 'concat': {
			const raw = p('clips', { clipValues: [] }) as { clipValues: unknown[] };
			return { clips: raw.clipValues ?? [] };
		}
		case 'composeVideo': {
			const raw = p('overlays', { overlayValues: [] }) as { overlayValues: unknown[] };
			return { main_video_url: p('mainVideoUrl'), overlays: raw.overlayValues ?? [] };
		}
		case 'merge': {
			const raw = p('images', { imageValues: [] }) as { imageValues: unknown[] };
			const body: Record<string, unknown> = { images: raw.imageValues ?? [], audio_url: p('audioUrl') };
			if (additional.audioMode !== undefined)       body.audio_mode = additional.audioMode;
			if (additional.bgAudioUrl !== undefined)      body.bg_audio_url = additional.bgAudioUrl;
			if (additional.bgAudioVolume !== undefined)   body.bg_audio_volume = additional.bgAudioVolume;
			if (additional.fadeSecs !== undefined)        body.fade_secs = additional.fadeSecs;
			if (additional.fit !== undefined)             body.fit = additional.fit;
			if (additional.fps !== undefined)             body.fps = additional.fps;
			if (additional.height !== undefined)          body.height = additional.height;
			if (additional.transition !== undefined)      body.transition = additional.transition;
			if (additional.width !== undefined)           body.width = additional.width;
			return body;
		}
		// ── image ──────────────────────────────────────────────────────────
		case 'generateImage': {
			const body: Record<string, unknown> = { prompt: p('prompt') };
			if (additional.height !== undefined)         body.height = additional.height;
			if (additional.negativePrompt !== undefined) body.negative_prompt = additional.negativePrompt;
			if (additional.seed !== undefined)           body.seed = additional.seed;
			if (additional.width !== undefined)          body.width = additional.width;
			return body;
		}
		// ── notify ─────────────────────────────────────────────────────────
		case 'sendEmail':
			return { to: p('to'), subject: p('subject'), message: p('message') };
		default:
			return {};
	}
}

export class Eranol implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Eranol',
		name: 'eranol',
		icon: 'file:eranol.svg',

		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Eranol FFmpeg media processing API',
		defaults: {
			name: 'Eranol',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'eranolApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Audio',
						value: 'audio',
					},
					{
						name: 'Compose',
						value: 'compose',
					},
					{
						name: 'Convert',
						value: 'convert',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Job',
						value: 'job',
					},
					{
						name: 'Notify',
						value: 'notify',
					},
					{
						name: 'Video',
						value: 'video',
					},
				],
				default: 'video',
			},
			...videoDescription,
			...audioDescription,
			...convertDescription,
			...composeDescription,
			...imageDescription,
			...notifyDescription,
			...jobDescription,
		],
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const request = this.helpers.httpRequestWithAuthentication.bind(this as never);
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;
			const useJsonBody = this.getNodeParameter('useJsonBody', i, false) as boolean;

			const p = (name: string, fallback?: unknown) => {
				try {
					return this.getNodeParameter(name, i);
				} catch {
					return fallback;
				}
			};

			let responseData: unknown;

			// ── GET/DELETE operations (no body) ────────────────────────────
			if (resource === 'job') {
				const jobId = operation !== 'verify' ? (p('jobId') as string) : '';

				if (operation === 'getStatus') {
					responseData = await request('eranolApi', {
						method: 'GET',
						url: `${BASE_URL}/ffmpeg/status/${jobId}`,
						headers: { Accept: 'application/json' },
					});
				} else if (operation === 'getResult') {
					responseData = await request('eranolApi', {
						method: 'GET',
						url: `${BASE_URL}/ffmpeg/result/${jobId}`,
						headers: { Accept: 'application/json' },
					});
				} else if (operation === 'deleteJob') {
					responseData = await request('eranolApi', {
						method: 'DELETE',
						url: `${BASE_URL}/ffmpeg/jobs/${jobId}`,
						headers: { Accept: 'application/json' },
					});
				} else if (operation === 'verify') {
					responseData = await request('eranolApi', {
						method: 'GET',
						url: `${BASE_URL}/verify`,
						headers: { Accept: 'application/json' },
					});
				}
			} else if (resource === 'image' && operation === 'imageStatus') {
				const jobId = p('jobId') as string;
				responseData = await request('eranolApi', {
					method: 'GET',
					url: `${BASE_URL}/image/status/${jobId}`,
					headers: { Accept: 'application/json' },
				});
			} else {
				// ── POST operations ────────────────────────────────────────
				const route = OPERATION_MAP[operation];
				if (!route) {
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
				}

				const body = useJsonBody
					? JSON.parse(p('jsonBody', '{}') as string)
					: buildBody(operation, p);

				responseData = await request('eranolApi', {
					method: route.method as 'POST',
					url: `${BASE_URL}${route.url}`,
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body,
					json: true,
				});
			}

			const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray(responseData as IDataObject | IDataObject[]),
				{ itemData: { item: i } },
			);
			returnData.push(...executionData);
		}

		return [returnData];
	}
}
