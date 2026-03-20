import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['image'],
		operation: ['imageStatus'],
	},
};

export const imageStatusDescription: INodeProperties[] = [
	{
		displayName: 'Job ID',
		name: 'jobId',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'The job ID returned from the Generate Image operation',
	},
];
