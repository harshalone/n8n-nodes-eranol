import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['audio'],
		operation: ['denoise'],
	},
};

export const denoiseDescription: INodeProperties[] = [
	{
		displayName: 'Audio URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the audio file to denoise',
		routing: {
			send: {
				type: 'body',
				property: 'url',
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
				displayName: 'Method',
				name: 'method',
				type: 'options',
				default: 'fft',
				options: [
					{ name: 'FFT', value: 'fft' },
					{ name: 'RNN', value: 'rnn' },
				],
				description: 'Noise reduction method',
				routing: {
					send: {
						type: 'body',
						property: 'method',
					},
				},
			},
			{
				displayName: 'Noise Reduction (dB)',
				name: 'noiseReduction',
				type: 'number',
				default: 12,
				description: 'Amount of noise reduction in decibels',
				routing: {
					send: {
						type: 'body',
						property: 'noise_reduction',
					},
				},
			},
		],
	},
];
