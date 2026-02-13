import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['job'],
		operation: ['deleteJob'],
	},
};

export const deleteJobDescription: INodeProperties[] = [
	{
		displayName: 'Job ID',
		name: 'jobId',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'The ID of the job to delete',
	},
];
