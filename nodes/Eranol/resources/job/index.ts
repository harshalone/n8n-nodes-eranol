import type { INodeProperties } from 'n8n-workflow';
import { getStatusDescription } from './getStatus';
import { getResultDescription } from './getResult';
import { deleteJobDescription } from './deleteJob';
import { verifyDescription } from './verify';

export const jobDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['job'],
			},
		},
		options: [
			{
				name: 'Delete',
				value: 'deleteJob',
				action: 'Delete a job',
				description: 'Remove a job and its associated output file',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/ffmpeg/jobs/{{$parameter.jobId}}',
					},
				},
			},
			{
				name: 'Get Result',
				value: 'getResult',
				action: 'Get job result',
				description: 'Get the result of a completed job',
				routing: {
					request: {
						method: 'GET',
						url: '=/ffmpeg/result/{{$parameter.jobId}}',
					},
				},
			},
			{
				name: 'Get Status',
				value: 'getStatus',
				action: 'Get job status',
				description: 'Retrieve current job status, progress, and completion data',
				routing: {
					request: {
						method: 'GET',
						url: '=/ffmpeg/status/{{$parameter.jobId}}',
					},
				},
			},
			{
				name: 'Verify API Key',
				value: 'verify',
				action: 'Verify API key',
				description: 'Check that the API key is valid and retrieve account details',
				routing: {
					request: {
						method: 'GET',
						url: '/verify',
					},
				},
			},
		],
		default: 'getStatus',
	},
	...getStatusDescription,
	...getResultDescription,
	...deleteJobDescription,
	...verifyDescription,
];
