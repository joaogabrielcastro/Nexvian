A API será RESTful e versionada.

Base:

```
/v1
```

## 7.1. Autenticação

Utilizar API Keys para integrações entre operadores e Nexvian.

Exemplo:

```
Authorization: Bearer nx_sandbox_xxxxxxxxx
```

As chaves deverão:

- Ser armazenadas com hash seguro.
- Possuir permissões.
- Permitir revogação.
- Permitir rotação.
- Ser separadas por ambiente.
- Ser vinculadas ao tenant.

## 7.2. Endpoints planejados

### Payment Intents

```
POST   /v1/payment-intents
GET    /v1/payment-intents/:id
POST   /v1/payment-intents/:id/cancel
```

### Transactions

```
GET    /v1/transactions
GET    /v1/transactions/:id
```

### Providers

```
GET    /v1/providers
```

### Reports

```
GET    /v1/reports/transactions
GET    /v1/reports/financial
```

### Webhooks

```
GET    /v1/webhook-endpoints
POST   /v1/webhook-endpoints
DELETE /v1/webhook-endpoints/:id
```

Os endpoints são uma proposta inicial. Antes de congelar o contrato, definir claramente os estados, permissões e semântica de cada operação.

## 7.3. Exemplo de criação de pagamento

```
POST /v1/payment-intents
Authorization: Bearer nx_sandbox_xxxxxxxxx
Idempotency-Key: order-123456
Content-Type: application/json
```

```
{
  "amount": 15000,
  "currency": "BRL",
  "paymentMethod": "CARD",
  "customer": {
    "externalId": "customer-123"
  },
  "metadata": {
    "orderId": "123456"
  }
}
```

## 7.4. Resposta esperada

```
{
  "id": "pi_123456",
  "status": "PENDING",
  "amount": 15000,
  "currency": "BRL",
  "createdAt": "2026-11-22T12:00:00Z"
}
```

## 7.5. Padrões

- JSON.
- ISO 8601 para datas.
- Valores monetários inteiros.
- Paginação.
- Filtros.
- Correlation ID.
- Idempotency Key.
- Erros padronizados.
- Versionamento.
- OpenAPI atualizado.