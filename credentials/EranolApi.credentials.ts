import type {
	ICredentialType,
	INodeProperties,
	Icon,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class EranolApi implements ICredentialType {
	name = 'eranolApi';

	displayName = 'Eranol API';

	documentationUrl = 'https://www.eranol.com/documentation';

	icon: Icon = 'file:../nodes/Eranol/eranol.svg';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your Eranol API key',
		},
	];

	// No generic `authenticate` block: the node attaches the x-api-key header
	// itself in execute(). Omitting it also stops n8n from injecting a
	// "Custom API Call" operation into the node's Operation dropdown.
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://eranol.com/api/v1',
			url: '/verify',
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};
}
