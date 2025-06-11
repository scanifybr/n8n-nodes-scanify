import { ICredentialType, INodeProperties, Icon } from 'n8n-workflow';

export class ScanifyApi implements ICredentialType {
	name = 'scanifyApi';
	displayName = 'Scanify API';
	documentationUrl = 'https://docs.scanify.com.br/';
	icon: Icon = {
		light: 'file:scanify.svg',
		dark: 'file:scanify.svg'
	};

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
}
