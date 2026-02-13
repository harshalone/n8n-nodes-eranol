import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['audio'],
		operation: ['highlights'],
	},
};

export const highlightsDescription: INodeProperties[] = [
	{
		displayName: 'Audio URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'URL of the audio file to extract highlights from',
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
				displayName: 'Top N',
				name: 'topN',
				type: 'number',
				default: 5,
				description: 'Number of top highlights to extract',
				routing: {
					send: {
						type: 'body',
						property: 'top_n',
					},
				},
			},
			{
				displayName: 'Clip Duration',
				name: 'clipDuration',
				type: 'number',
				default: 10,
				description: 'Duration of each highlight clip in seconds',
				routing: {
					send: {
						type: 'body',
						property: 'clip_duration',
					},
				},
			},
		],
	},
];
