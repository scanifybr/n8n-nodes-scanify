import {
	IWebhookFunctions,
	IWebhookResponseData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

export class ScanifyTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Scanify Trigger',
		name: 'scanifyTrigger',
		icon: 'file:scanify.svg',
		group: ['trigger'],
		version: 1,
		description: 'Dispara quando o Scanify envia o resultado da extração de um documento',
		defaults: {
			name: 'Scanify Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				isFullPath: true,
				path: 'scanify-document',
			},
		],
		properties: [],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData();
		return {
			workflowData: [
				[
					{
						json: body,
					},
				],
			],
		};
	}
}
