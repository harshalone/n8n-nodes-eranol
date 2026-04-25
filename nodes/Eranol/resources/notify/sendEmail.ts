import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['notify'],
		operation: ['sendEmail'],
	},
};

export const sendEmailDescription: INodeProperties[] = [
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
				resource: ['notify'],
				operation: ['sendEmail'],
				useJsonBody: [true],
			},
		},
		description: 'The JSON body to send with the request',
	},
	{
		displayName: 'To',
		name: 'to',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['notify'],
				operation: ['sendEmail'],
				useJsonBody: [false],
			},
		},
		description: 'Recipient email address',
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['notify'],
				operation: ['sendEmail'],
				useJsonBody: [false],
			},
		},
		description: 'Email subject line',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['notify'],
				operation: ['sendEmail'],
				useJsonBody: [false],
			},
		},
		description: 'HTML email body',
		typeOptions: {
			rows: 5,
		},
	},
];
