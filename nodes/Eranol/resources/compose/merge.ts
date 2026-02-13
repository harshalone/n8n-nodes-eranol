import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['compose'],
		operation: ['merge'],
	},
};

export const mergeDescription: INodeProperties[] = [
	{
		displayName: 'Images',
		name: 'images',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		default: {},
		displayOptions,
		description: 'Image slides to combine into video',
		options: [
			{
				name: 'imageValues',
				displayName: 'Image',
				values: [
					{
						displayName: 'Image URL',
						name: 'url',
						type: 'string',
						default: '',
						required: true,
						description: 'URL of the image',
					},
					{
						displayName: 'Duration (Seconds)',
						name: 'duration',
						type: 'number',
						default: 5,
						required: true,
						description: 'How long this image is displayed',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'images',
				value: '={{$value.imageValues}}',
			},
		},
	},
	{
		displayName: 'Audio URL',
		name: 'audioUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the audio track',
		routing: {
			send: {
				type: 'body',
				property: 'audio_url',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions,
		options: [
			{
				displayName: 'Audio Mode',
				name: 'audioMode',
				type: 'options',
				default: 'trim',
				options: [
					{ name: 'Trim', value: 'trim' },
					{ name: 'Loop', value: 'loop' },
				],
				description: 'How audio length is handled relative to video',
				routing: {
					send: {
						type: 'body',
						property: 'audio_mode',
					},
				},
			},
			{
				displayName: 'Background Audio URL',
				name: 'bgAudioUrl',
				type: 'string',
				default: '',
				description: 'URL of a background audio track to mix in',
				routing: {
					send: {
						type: 'body',
						property: 'bg_audio_url',
					},
				},
			},
			{
				displayName: 'Background Audio Volume',
				name: 'bgAudioVolume',
				type: 'number',
				typeOptions: { minValue: 0, maxValue: 1, numberPrecision: 2 },
				default: 0.3,
				description: 'Volume level for the background audio (0-1)',
				routing: {
					send: {
						type: 'body',
						property: 'bg_audio_volume',
					},
				},
			},
			{
				displayName: 'Fade Duration (Seconds)',
				name: 'fadeSecs',
				type: 'number',
				typeOptions: { numberPrecision: 1 },
				default: 0.5,
				description: 'Duration of the fade transition in seconds',
				routing: {
					send: {
						type: 'body',
						property: 'fade_secs',
					},
				},
			},
			{
				displayName: 'Fit',
				name: 'fit',
				type: 'options',
				default: 'cover',
				options: [
					{ name: 'Cover', value: 'cover' },
					{ name: 'Contain', value: 'contain' },
					{ name: 'Fill', value: 'fill' },
				],
				description: 'How images are fit to the output dimensions',
				routing: {
					send: {
						type: 'body',
						property: 'fit',
					},
				},
			},
			{
				displayName: 'FPS',
				name: 'fps',
				type: 'number',
				default: 30,
				description: 'Frames per second for the output video',
				routing: {
					send: {
						type: 'body',
						property: 'fps',
					},
				},
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 1080,
				description: 'Output video height in pixels',
				routing: {
					send: {
						type: 'body',
						property: 'height',
					},
				},
			},
			{
				displayName: 'Transition',
				name: 'transition',
				type: 'options',
				default: 'fade',
				options: [
					{ name: 'Fade', value: 'fade' },
					{ name: 'None', value: 'none' },
				],
				description: 'Transition effect between slides',
				routing: {
					send: {
						type: 'body',
						property: 'transition',
					},
				},
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 1920,
				description: 'Output video width in pixels',
				routing: {
					send: {
						type: 'body',
						property: 'width',
					},
				},
			},

		],
	},
];
