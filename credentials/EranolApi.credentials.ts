import type {
	IAuthenticateGeneric,
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

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://eranol.com/api/v1',
			url: '/me',
		},
	};



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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

}
