import type { INodeProperties } from 'n8n-workflow';
import { sendEmailDescription } from './sendEmail';

export const notifyDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['notify'],
			},
		},
		options: [
			{
				name: 'Send Email',
				value: 'sendEmail',
				action: 'Send email notification',
				description: 'Send an HTML email notification',
				routing: {
					request: {
						method: 'POST',
						url: '/notifications/email',
						headers: { 'Content-Type': 'application/json' },
					},
				},
			},
		],
		default: 'sendEmail',
	},
	...sendEmailDescription,
];
