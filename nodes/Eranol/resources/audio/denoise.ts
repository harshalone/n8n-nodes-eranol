import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['audio'],
		operation: ['denoise'],
	},
};

export const denoiseDescription: INodeProperties[] = [
	{
		displayName: 'Send as JSON',
		name: 'useJsonBody',
		type: 'boolean',
		default: false,
		displayOptions,
		description: 'Whether to send the request body as raw JSON instead of using individual fields',
		noDataExpression: true,
	},
	{
		displayName: 'JSON Body',
		name: 'jsonBody',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				resource: ['audio'],
				operation: ['denoise'],
				useJsonBody: [true],
			},
		},
		description: 'The JSON body to send with the request',
	},
	{
		displayName: 'Audio URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['audio'],
				operation: ['denoise'],
				useJsonBody: [false],
			},
		},
		description: 'URL of the audio file to denoise',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['audio'],
				operation: ['denoise'],
				useJsonBody: [false],
			},
		},
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
			},
			{
				displayName: 'Noise Reduction (dB)',
				name: 'noiseReduction',
				type: 'number',
				default: 12,
				description: 'Amount of noise reduction in decibels',
			},
		],
	},
];
