import type { INodePropertyOptions } from 'n8n-workflow';

/**
 * Authoritative table of every Eranol POST operation exposed by the Universal
 * resource. Each entry carries the exact display name used in the Eranol
 * documentation, the HTTP route, a link to its documentation page, and a set of
 * copy-paste-ready payload examples taken verbatim from the Eranol docs.
 *
 * Source: https://www.eranol.com/documentation (per-endpoint pages).
 */
export interface EranolExample {
	/** Short label shown in the Example dropdown, e.g. "Basic" or "Styled". */
	label: string;
	/** Copy-paste-ready request body for this use case. */
	body: Record<string, unknown>;
}

export interface EranolOperation {
	name: string;
	value: string;
	description: string;
	method: 'POST';
	url: string;
	/** Full documentation page for this operation. */
	docs: string;
	examples: EranolExample[];
}

const DOCS = 'https://www.eranol.com/documentation';

export const OPERATIONS: EranolOperation[] = [
	// ── Video ────────────────────────────────────────────────────────────────
	{
		name: 'Add Intro',
		value: 'addIntro',
		description: 'Prepend an intro clip to a video',
		method: 'POST',
		url: '/ffmpeg/video/add-intro',
		docs: `${DOCS}/ffmpeg-api-for-add-intro`,
		examples: [
			{
				label: 'Basic',
				body: {
					url: 'https://cdn.example.com/main.mp4',
					intro_url: 'https://cdn.example.com/intro.mp4',
				},
			},
		],
	},
	{
		name: 'Add Outro',
		value: 'addOutro',
		description: 'Append an outro clip to a video',
		method: 'POST',
		url: '/ffmpeg/video/add-outro',
		docs: `${DOCS}/ffmpeg-api-for-add-outro`,
		examples: [
			{
				label: 'Basic',
				body: {
					url: 'https://cdn.example.com/main.mp4',
					outro_url: 'https://cdn.example.com/outro.mp4',
				},
			},
		],
	},
	{
		name: 'Caption',
		value: 'caption',
		description: 'Auto-generate and burn captions onto a video',
		method: 'POST',
		url: '/ffmpeg/video/caption',
		docs: `${DOCS}/ffmpeg-api-for-captions-api`,
		examples: [
			{
				label: 'Basic',
				body: { url: 'https://cdn.example.com/video.mp4' },
			},
			{
				label: 'Full options',
				body: {
					url: 'https://cdn.example.com/video.mp4',
					language: 'en',
					position: 'bottom',
					font_size: 24,
					font_color: 'white',
					padding_top: 30,
					outline_color: 'black',
					outline_width: 2,
					padding_bottom: 30,
					max_words_per_line: 7,
					max_segment_duration: 3,
				},
			},
		],
	},
	{
		name: 'Extract Audio',
		value: 'extractAudio',
		description: 'Isolate the audio track from a video',
		method: 'POST',
		url: '/ffmpeg/video/extract/audio',
		docs: `${DOCS}/ffmpeg-api-for-extract-audio-track-from-a-video`,
		examples: [
			{
				label: 'Mono',
				body: {
					url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song.mp4',
					mono: true,
				},
			},
		],
	},
	{
		name: 'Extract Images',
		value: 'extractImages',
		description: 'Extract frames from a video as images',
		method: 'POST',
		url: '/ffmpeg/video/extract/images',
		docs: `${DOCS}/ffmpeg-api-for-extract-images-from-a-video`,
		examples: [
			{
				label: 'Basic',
				body: {
					fps: 1,
					url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song.mp4',
					end_sec: 0,
					start_sec: 0,
				},
			},
		],
	},
	{
		name: 'Generate GIF',
		value: 'generateGif',
		description: 'Create an animated GIF from a video segment',
		method: 'POST',
		url: '/ffmpeg/video/extract/gif',
		docs: `${DOCS}/ffmpeg-api-for-generate-a-gif-from-a-video`,
		examples: [
			{
				label: 'Basic',
				body: {
					fps: 10,
					url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song.mp4',
					width: 480,
					end_sec: 0,
					start_sec: 0,
				},
			},
		],
	},
	{
		name: 'Overlay',
		value: 'overlay',
		description: 'Overlay images or text onto a video',
		method: 'POST',
		url: '/ffmpeg/video/overlay',
		docs: `${DOCS}/ffmpeg-api-for-overlay`,
		examples: [
			{
				label: 'Image + text',
				body: {
					url: 'https://cdn.example.com/video.mp4',
					overlays: [
						{
							x: 20,
							y: 20,
							type: 'image',
							scale: 0.12,
							content: 'https://cdn.example.com/logo.png',
							opacity: 0.9,
						},
						{
							type: 'text',
							margin: 20,
							content: 'Breaking News',
							end_sec: 12,
							position: 'bottom_left',
							font_size: 40,
							start_sec: 3,
							font_color: '#ffffff',
						},
					],
				},
			},
		],
	},
	{
		name: 'Progress Bar',
		value: 'progressBar',
		description: 'Add a progress bar to a video',
		method: 'POST',
		url: '/ffmpeg/video/progress-bar',
		docs: `${DOCS}/ffmpeg-api-for-progress-bar`,
		examples: [
			{
				label: 'Full options',
				body: {
					url: 'https://cdn.example.com/video.mp4',
					color: '00ff00',
					style: 'shrink',
					height: 5,
					opacity: 1,
					padding: 60,
					bg_color: '333333',
					position: 'top',
				},
			},
		],
	},
	{
		name: 'Reframe',
		value: 'reframe',
		description: 'Reframe a video to new dimensions',
		method: 'POST',
		url: '/ffmpeg/video/reframe',
		docs: `${DOCS}/ffmpeg-api-for-reframe`,
		examples: [
			{
				label: 'Basic',
				body: {
					url: 'https://example.com/',
					width: 0,
					height: 0,
					bg_color: '#000000',
				},
			},
		],
	},
	{
		name: 'Thumbnail',
		value: 'thumbnail',
		description: 'Generate a thumbnail image from a video',
		method: 'POST',
		url: '/ffmpeg/video/thumbnail',
		docs: `${DOCS}/ffmpeg-api-for-thumbnail`,
		examples: [
			{
				label: 'With text',
				body: {
					url: 'https://cdn.example.com/video.mp4',
					text: 'Episode 1',
					bg_color: 'black@0.5',
					position: 'center',
					font_size: 48,
					timestamp: 5,
					font_color: 'white',
				},
			},
		],
	},
	{
		name: 'Zoom',
		value: 'zoom',
		description: 'Apply zoom effects to specific time segments in a video',
		method: 'POST',
		url: '/ffmpeg/video/zoom',
		docs: `${DOCS}/ffmpeg-api-for-zoom`,
		examples: [
			{
				label: 'Basic',
				body: {
					url: 'https://cdn.example.com/talking-head.mp4',
					segments: [
						{ start_sec: 5, duration_sec: 6 },
						{ start_sec: 22, duration_sec: 4 },
					],
					zoom_level: 1.3,
				},
			},
		],
	},
	{
		name: 'Trim',
		value: 'trim',
		description: 'Cut a video to a start/end range',
		method: 'POST',
		url: '/ffmpeg/video/trim',
		docs: `${DOCS}/ffmpeg-api-for-trim`,
		examples: [
			{
				label: 'Basic',
				body: {
					url: 'https://example.com/',
					end_sec: 0,
					start_sec: 0,
				},
			},
		],
	},
	{
		name: 'Watermark',
		value: 'watermark',
		description: 'Add a watermark image onto a video',
		method: 'POST',
		url: '/ffmpeg/video/watermark',
		docs: `${DOCS}/ffmpeg-api-for-watermark`,
		examples: [
			{
				label: 'Full options',
				body: {
					url: 'https://cdn.example.com/video.mp4',
					scale: 0.15,
					margin: 10,
					opacity: 0.8,
					position: 'bottom_right',
					watermark_url: 'https://cdn.example.com/logo.png',
				},
			},
		],
	},
	// ── Audio ────────────────────────────────────────────────────────────────
	{
		name: 'Add Background Music',
		value: 'addBackgroundMusic',
		description: 'Add background music to a video',
		method: 'POST',
		url: '/ffmpeg/video/add-bg-audio',
		docs: `${DOCS}/ffmpeg-api-for-background-audio`,
		examples: [
			{
				label: 'Basic',
				body: {
					video_url: 'https://cdn.example.com/video.mp4',
					bg_audio_url: 'https://cdn.example.com/music.mp3',
					bg_audio_volume: 0.2,
				},
			},
		],
	},
	{
		name: 'Denoise',
		value: 'denoise',
		description: 'Remove background noise from audio',
		method: 'POST',
		url: '/ffmpeg/audio/denoise',
		docs: `${DOCS}/ffmpeg-api-for-denoise`,
		examples: [
			{
				label: 'FFT (afftdn)',
				body: {
					url: 'https://cdn.example.com/noisy-audio.mp4',
					method: 'afftdn',
					noise_reduction: 15,
				},
			},
			{
				label: 'Neural (arnndn)',
				body: {
					url: 'https://cdn.example.com/noisy-audio.mp4',
					method: 'arnndn',
				},
			},
		],
	},
	{
		name: 'Enhance Voice',
		value: 'enhanceVoice',
		description: 'Studio-quality voice enhancement with ML-based noise reduction',
		method: 'POST',
		url: '/ffmpeg/audio/enhance',
		docs: `${DOCS}/enhance-audio`,
		examples: [
			{
				label: 'Basic',
				body: { url: 'https://cdn.example.com/raw.mp4' },
			},
			{
				label: 'Full options',
				body: {
					url: 'https://cdn.example.com/raw.mp4',
					voice_profile: 'bright',
					loudness_target: -16,
					post_filter: true,
					atten_limit_db: 100,
					keep_video: true,
					output_format: 'mp3',
				},
			},
		],
	},
	{
		name: 'Highlights',
		value: 'highlights',
		description: 'Extract highlight clips from audio',
		method: 'POST',
		url: '/ffmpeg/audio/highlights',
		docs: `${DOCS}/ffmpeg-api-for-highlights`,
		examples: [
			{
				label: 'Top N clips',
				body: {
					url: 'https://cdn.example.com/podcast.mp4',
					top_n: 5,
					segment_duration: 5,
				},
			},
		],
	},
	{
		name: 'Remove Silence',
		value: 'removeSilence',
		description: 'Trim silent sections from audio',
		method: 'POST',
		url: '/ffmpeg/audio/remove-silence',
		docs: `${DOCS}/ffmpeg-api-for-remove-silence`,
		examples: [
			{
				label: 'Full options',
				body: {
					url: 'https://cdn.example.com/podcast.mp4',
					padding: 0.1,
					silence_thresh_db: -30,
					min_silence_duration: 0.5,
				},
			},
		],
	},
	// ── Convert ──────────────────────────────────────────────────────────────
	{
		name: 'Convert Audio to MP3',
		value: 'audioToMp3',
		description: 'Convert an audio file to MP3',
		method: 'POST',
		url: '/ffmpeg/convert/audio/to/mp3',
		docs: `${DOCS}/ffmpeg-api-for-convert-audio-to-mp3`,
		examples: [
			{
				label: 'Basic',
				body: { url: 'https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.wav' },
			},
		],
	},
	{
		name: 'Convert Audio to WAV',
		value: 'audioToWav',
		description: 'Convert an audio file to WAV',
		method: 'POST',
		url: '/ffmpeg/convert/audio/to/wav',
		docs: `${DOCS}/ffmpeg-api-for-convert-audio-to-wav`,
		examples: [
			{
				label: 'Basic',
				body: { url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
			},
		],
	},
	{
		name: 'Convert Image to JPG',
		value: 'imageToJpg',
		description: 'Convert an image to JPG',
		method: 'POST',
		url: '/ffmpeg/convert/image/to/jpg',
		docs: `${DOCS}/ffmpeg-api-for-convert-to-jpg`,
		examples: [
			{
				label: 'Basic',
				body: { url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.png' },
			},
		],
	},
	{
		name: 'Convert Image to WebP',
		value: 'imageToWebp',
		description: 'Convert an image to WebP',
		method: 'POST',
		url: '/ffmpeg/convert/image/to/webp',
		docs: `${DOCS}/ffmpeg-api-for-convert-to-webp`,
		examples: [
			{
				label: 'Basic',
				body: { url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.png' },
			},
		],
	},
	{
		name: 'Convert Video to MP4',
		value: 'videoToMp4',
		description: 'Convert a video to MP4',
		method: 'POST',
		url: '/ffmpeg/convert/video/to/mp4',
		docs: `${DOCS}/ffmpeg-api-for-convert-a-video-file-to-mp4`,
		examples: [
			{
				label: 'Basic',
				body: { url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.webm' },
			},
		],
	},
	{
		name: 'Convert Video to WebM',
		value: 'videoToWebm',
		description: 'Convert a video to WebM',
		method: 'POST',
		url: '/ffmpeg/convert/video/to/webm',
		docs: `${DOCS}/ffmpeg-api-for-convert-to-webm`,
		examples: [
			{
				label: 'Basic',
				body: { url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp4' },
			},
		],
	},
	// ── Compose ──────────────────────────────────────────────────────────────
	{
		name: 'Concat',
		value: 'concat',
		description: 'Concatenate multiple clips into one video',
		method: 'POST',
		url: '/ffmpeg/video/concat',
		docs: `${DOCS}/ffmpeg-api-for-concat`,
		examples: [
			{
				label: 'Ordered clips',
				body: {
					clips: [
						{ url: 'https://cdn.eranol.com/videos/intro.mp4', order: 1 },
						{ url: 'https://cdn.eranol.com/videos/main-segment.mov', order: 2 },
						{ url: 'https://cdn.eranol.com/videos/outro.webm', order: 3 },
					],
				},
			},
		],
	},
	{
		name: 'Compose Video',
		value: 'composeVideo',
		description: 'Compose a video from a main clip plus timed overlays',
		method: 'POST',
		url: '/ffmpeg/video/compose',
		docs: `${DOCS}/ffmpeg-api-for-compose`,
		examples: [
			{
				label: 'Main + overlays',
				body: {
					main_video_url: 'https://cdn.example.com/main.mp4',
					overlays: [
						{
							url: 'https://cdn.example.com/clip.mp4',
							type: 'video',
							start_time: 2,
							end_time: 5,
						},
						{
							url: 'https://cdn.example.com/image.jpg',
							type: 'image',
							start_time: 7,
							end_time: 9,
						},
					],
				},
			},
		],
	},
	{
		name: 'Merge',
		value: 'merge',
		description: 'Merge images and audio into a video',
		method: 'POST',
		url: '/ffmpeg/merge',
		docs: `${DOCS}/ffmpeg-api-for-merge`,
		examples: [
			{
				label: 'Basic',
				body: {
					width: 1280,
					height: 720,
					images: [
						{ url: 'https://picsum.photos/1920/1080.jpg?random=1', duration: 3 },
						{ url: 'https://picsum.photos/1920/1080.jpg?random=2', duration: 3 },
					],
					audio_url: 'https://example.com/voiceover.wav',
				},
			},
			{
				label: 'With background audio',
				body: {
					width: 1280,
					height: 720,
					images: [
						{ url: 'https://picsum.photos/1920/1080.jpg?random=1', duration: 3 },
						{ url: 'https://picsum.photos/1920/1080.jpg?random=2', duration: 3 },
					],
					audio_url: 'https://example.com/voiceover.wav',
					audio_mode: 'video_length',
					transition: 'fade',
					bg_audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
					bg_audio_volume: 0.2,
				},
			},
		],
	},
	// ── Image ────────────────────────────────────────────────────────────────
	{
		name: 'Generate Image',
		value: 'generateImage',
		description: 'Generate an image from a text prompt with AI',
		method: 'POST',
		url: '/image',
		docs: `${DOCS}/ffmpeg-api-for-image`,
		examples: [
			{
				label: 'Basic',
				body: { prompt: 'A serene mountain lake at sunrise' },
			},
		],
	},
	// ── Social ───────────────────────────────────────────────────────────────
	{
		name: 'Publish to TikTok',
		value: 'publishTiktok',
		description: 'Post a video to TikTok via the Content Posting API',
		method: 'POST',
		url: '/social/tiktok/publish',
		docs: `${DOCS}/ffmpeg-api-for-tiktok`,
		examples: [
			{
				label: 'Basic',
				body: {
					title: 'Check this out! #fyp',
					video_url: 'https://your-r2-or-cdn-url/video.mp4',
					privacy_level: 'PUBLIC_TO_EVERYONE',
					disable_duet: false,
					disable_stitch: false,
					disable_comment: false,
					scheduled_publish_time: null,
				},
			},
		],
	},
	// ── Notify ───────────────────────────────────────────────────────────────
	{
		name: 'Send Email',
		value: 'sendEmail',
		description: 'Send an email notification',
		method: 'POST',
		url: '/notifications/email',
		docs: `${DOCS}/ffmpeg-api-for-notify`,
		examples: [
			{
				label: 'Basic',
				body: {
					to: 'user@example.com',
					message: '<p>Your HTML email body</p>',
					subject: 'Your email subject',
				},
			},
		],
	},
];

/** Map keyed by operation value for fast route lookup at execution time. */
export const OPERATION_BY_VALUE: Record<string, EranolOperation> = Object.fromEntries(
	OPERATIONS.map((op) => [op.value, op]),
);

/** Dropdown options for the Universal Operation field, sorted alphabetically. */
export const OPERATION_OPTIONS: INodePropertyOptions[] = [...OPERATIONS]
	.sort((a, b) => a.name.localeCompare(b.name))
	.map((op) => ({ name: op.name, value: op.value, description: op.description }));
