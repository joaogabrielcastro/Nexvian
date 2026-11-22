A modelagem definitiva será validada durante as sprints de Transaction Engine e Ledger.

## 6.1. Entidades principais

| Entidade | Descrição |
| --- | --- |
| Tenant | Operador cliente |
| User | Usuário da plataforma |
| Role | Papel de acesso |
| Permission | Permissões |
| ApiKey | Chaves de integração |
| PaymentIntent | Intenção de pagamento |
| Transaction | Transação financeira |
| TransactionEvent | Histórico de eventos |
| Provider | Provedor de pagamento |
| ProviderAccount | Conta/configuração do provedor |
| RoutingRule | Regra de roteamento |
| LedgerAccount | Conta contábil |
| LedgerEntry | Lançamento contábil |
| WebhookEndpoint | Endpoint do operador |
| WebhookDelivery | Entrega de webhook |
| IdempotencyRecord | Registro de idempotência |
| ReconciliationBatch | Lote de conciliação |
| ReconciliationItem | Item conciliado |
| AuditLog | Auditoria |

## 6.2. Relacionamentos principais

```
Tenant
  |
  +-- Users
  +-- ApiKeys
  +-- PaymentIntents
  +-- Transactions
  +-- WebhookEndpoints
  +-- RoutingRules
  +-- LedgerAccounts
  +-- AuditLogs

PaymentIntent
  |
  +-- Transactions
          |
          +-- TransactionEvents
          +-- Provider
          +-- LedgerEntries
          +-- WebhookDeliveries
```

## 6.3. Regras de banco de dados

- Todas as entidades pertencentes a um operador devem possuir `tenantId`.
- Consultas devem validar o tenant autenticado.
- Índices devem contemplar os principais filtros.
- Chaves de idempotência devem possuir restrições de unicidade no escopo definido.
- Lançamentos financeiros não podem ser alterados após contabilização.
- Operações financeiras devem utilizar transações ACID.
- Exclusões devem respeitar requisitos de auditoria e retenção.
- Valores monetários devem utilizar inteiros e moeda ISO 4217 quando aplicável.