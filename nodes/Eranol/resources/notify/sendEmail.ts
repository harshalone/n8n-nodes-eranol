import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['notify'],
		operation: ['sendEmail'],
	},
};

export const sendEmailDescription: INodeProperties[] = [
	{
		displayName: 'To',
		name: 'to',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'Recipient email address',
		routing: {
			send: {
				type: 'body',
				property: 'to',
			},
		},
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'Email subject line',
		routing: {
			send: {
				type: 'body',
				property: 'subject',
			},
		},
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'HTML email body',
		typeOptions: {
			rows: 5,
		},
		routing: {
			send: {
				type: 'body',
				property: 'message',
			},
		},
	},
];
