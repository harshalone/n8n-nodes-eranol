import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['job'],
		operation: ['getResult'],
	},
};

export const getResultDescription: INodeProperties[] = [
	{
		displayName: 'Job ID',
		name: 'jobId',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'The ID of the completed job to get results for',
	},
];
