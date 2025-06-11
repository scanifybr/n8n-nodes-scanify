import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
	NodeConnectionType,
} from 'n8n-workflow';

import FormData from 'form-data';

export class Scanify implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Scanify',
		name: 'scanify',
		icon: { light: 'file:scanify.svg', dark: 'file:scanify.svg' },
		group: ['transform'],
		version: 1,
		description:
			'Envia arquivos de documentos brasileiros para extração de dados usando a API Scanify',
		defaults: {
			name: 'Scanify',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'scanifyApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Binary Property (Arquivo)',
				name: 'binaryPropertyName',
				type: 'string',
				default: 'data',
				required: true,
			},
			{
				displayName: 'Document Type',
				name: 'documentType',
				type: 'string',
				default: '',
				required: true,
			},
			{
				displayName: 'Callback URL',
				name: 'callbackUrl',
				type: 'string',
				default: '',
				required: true,
			},
			{
				displayName: 'Reference ID',
				name: 'referenceId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Metadata (JSON)',
				name: 'metadata',
				type: 'json',
				default: '{}',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('scanifyApi');
		const apiKey = credentials.apiKey;

		for (let i = 0; i < items.length; i++) {
			const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i);
			const documentType = this.getNodeParameter('documentType', i);
			const callbackUrl = this.getNodeParameter('callbackUrl', i);
			const referenceId = this.getNodeParameter('referenceId', i);
			const metadata = this.getNodeParameter('metadata', i);

			if (!items[i].binary?.[binaryPropertyName]) {
				throw new NodeApiError(this.getNode(), {
					message: `Nenhum dado binário encontrado no campo: ${binaryPropertyName}`,
				});
			}

			const binaryData = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
			const binaryMeta = items[i].binary![binaryPropertyName];

			const form = new FormData();
			form.append('file', binaryData, binaryMeta.fileName ?? 'file');
			form.append('documentType', documentType);
			form.append('callbackUrl', callbackUrl);
			if (referenceId) form.append('referenceId', referenceId);
			if (metadata) {
				try {
					const metadataJson =
						typeof metadata === 'object' ? metadata : JSON.parse(metadata as string);
					form.append('metadata', JSON.stringify(metadataJson));
				} catch (error) {
					throw new NodeApiError(this.getNode(), {
						message: 'O campo Metadata deve ser um JSON válido.',
					});
				}
			}

			try {
				const response = await this.helpers.httpRequest({
					method: 'POST',
					url: 'https://api.scanify.com.br/extract',
					headers: {
						...form.getHeaders(),
						Authorization: `Bearer ${apiKey}`,
					},
					body: form,
				});

				returnData.push({ json: response });
			} catch (error) {
				throw new NodeApiError(this.getNode(), error);
			}
		}

		return [returnData];
	}
}
