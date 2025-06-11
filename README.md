# n8n-nodes-scanify

Este é um node da comunidade n8n que permite integrar a API do Scanify diretamente nos seus fluxos de automação.

O **Scanify** é uma API brasileira de OCR inteligente que extrai, valida e estrutura dados de documentos como boletos, notas fiscais, contratos e outros arquivos em PDF, JPG ou PNG. Tudo pronto para automações, sistemas e IA.

[n8n](https://n8n.io/) é uma plataforma de automação open source com [licença fair-code](https://docs.n8n.io/reference/license/).

[Instalação](#instalação)  
[Operações](#operações)  
[Credenciais](#credenciais)  
[Compatibilidade](#compatibilidade)  
[Como usar](#como-usar)  
[Recursos](#recursos)  
[Histórico de versões](#histórico-de-versões)  

---

## Instalação

Siga o [guia de instalação oficial](https://docs.n8n.io/integrations/community-nodes/installation/) para nodes da comunidade.

Para desenvolvimento local, você também pode usar:

```bash
npm install
npm run build
npm link
```

E no seu projeto principal do n8n:

```bash
npm link n8n-nodes-scanify
```

Reinicie o n8n para que o node Scanify apareça na lista.

---

## Operações

Atualmente, este node suporta:

---

## Nodes disponíveis

| Node             | Tipo     | Descrição                                                              |
|------------------|----------|------------------------------------------------------------------------|
| `Scanify`        | Ação     | Envia documentos (PDF, PNG, JPG) para a API Scanify                   |
| `Scanify Trigger`| Trigger  | Dispara automaticamente quando a Scanify envia o resultado via callback |

---

## Credenciais

Este pacote utiliza autenticação via **API Key**.

1. Acesse [https://scanify.com.br](https://scanify.com.br) e gere sua chave de API.
2. No n8n, vá em **Credenciais > Scanify API** e adicione sua chave.
3. O node `Scanify` utilizará essa credencial automaticamente

---

## Compatibilidade

- Requer **n8n v1.18.0** ou superior (usa `NodeConnectionType`)
- Testado nas versões:
  - n8n `1.18.0`
  - n8n `1.22.1`

Sem problemas conhecidos.

---

## Como usar

### 📤 Envio com `Scanify`

1. Use o node **Read Binary File** para carregar um arquivo local.
2. Conecte ao node **Scanify**.
3. Preencha os campos:
   - `documentType`: Ex: `"NFE"`, `"BOLETO"`
   - `callbackUrl`: Defina como o endpoint gerado pelo `Scanify Trigger`
4. Execute o fluxo.

#### Pré-requisitos

O node espera um **arquivo binário** como entrada. Você pode obtê-lo usando:
- `Read Binary File`
- `HTTP Request`
- Qualquer outro node que forneça binário

Campos obrigatórios:
- `documentType`: tipo do documento (ex: `"BOLETO"`, `"NFE"`)
- `callbackUrl`: URL que receberá o resultado do OCR

Campos opcionais:
- `referenceId`: ID de referência do seu sistema
- `metadata`: objeto JSON com dados adicionais (ex: `{ "clienteId": "123" }`)

### 📥 Recebimento com `Scanify Trigger`

1. Crie um novo workflow.
2. Adicione o node **Scanify Trigger**.
3. Ative o workflow.
4. O n8n exibirá uma URL como:

```
https://n8n.seudominio.com/webhook/scanify-document
```

5. Use essa URL no campo `callbackUrl` do node `Scanify`.

Assim que a Scanify concluir o processamento do documento, ela enviará os dados diretamente para esse trigger.

### Exemplo de uso

1. Adicione o node **Read Binary File** para carregar um arquivo local
2. Conecte ao node **Scanify**
3. Preencha os campos obrigatórios
4. Execute o fluxo
5. O processamento será feito em background e a resposta será enviada para a `callbackUrl` informada

---

## Recursos

- [Documentação do n8n para nodes da comunidade](https://docs.n8n.io/integrations/#community-nodes)
- [Documentação oficial do Scanify](https://docs.scanify.com.br/)
- [Blog do Scanify](https://scanify.com.br/blog)

---

## Histórico de versões

| Versão | Descrição |
|--------|-----------|
| 1.0.0  | Versão inicial com envio e trigger para recebimento de resultados |