import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['audio'],
		operation: ['removeSilence'],
	},
};

export const removeSilenceDescription: INodeProperties[] = [
	{
		displayName: 'Audio URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the audio file to process',
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
				displayName: 'Silence Threshold (dB)',
				name: 'silenceThreshDb',
				type: 'number',
				default: -40,
				description: 'Volume threshold below which audio is considered silence',
				routing: {
					send: {
						type: 'body',
						property: 'silence_thresh_db',
					},
				},
			},
			{
				displayName: 'Min Silence Duration',
				name: 'minSilenceDuration',
				type: 'number',
				typeOptions: { numberPrecision: 2 },
				default: 0.5,
				description: 'Minimum duration of silence to remove (seconds)',
				routing: {
					send: {
						type: 'body',
						property: 'min_silence_duration',
					},
				},
			},
			{
				displayName: 'Padding',
				name: 'padding',
				type: 'number',
				typeOptions: { numberPrecision: 2 },
				default: 0.1,
				description: 'Padding to keep around non-silent segments (seconds)',
				routing: {
					send: {
						type: 'body',
						property: 'padding',
					},
				},
			},
		],
	},
];
