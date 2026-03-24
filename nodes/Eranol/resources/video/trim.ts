import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['video'],
		operation: ['trim'],
	},
};

export const trimDescription: INodeProperties[] = [
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
				resource: ['video'],
				operation: ['trim'],
				useJsonBody: [true],
			},
		},
		description: 'The JSON body to send with the request',
		routing: {
			send: {
				type: 'body',
				value: '={{JSON.parse($value)}}',
			},
		},
	},
	{
		displayName: 'Video URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['trim'],
				useJsonBody: [false],
			},
		},
		description: 'URL of the video to trim',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
	{
		displayName: 'Start (Seconds)',
		name: 'startSec',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['trim'],
				useJsonBody: [false],
			},
		},
		description: 'Start time in seconds',
		routing: {
			send: {
				type: 'body',
				property: 'start_sec',
			},
		},
	},
	{
		displayName: 'End (Seconds)',
		name: 'endSec',
		type: 'number',
		required: true,
		default: 10,
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['trim'],
				useJsonBody: [false],
			},
		},
		description: 'End time in seconds',
		routing: {
			send: {
				type: 'body',
				property: 'end_sec',
			},
		},
	},
];
