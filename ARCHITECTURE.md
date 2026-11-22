## 5.1. Modelo arquitetural

**Modular Monolith + Event-Driven Processing.**

A primeira versão utilizará um monólito modular, evitando a complexidade prematura de microserviços.

Os módulos terão responsabilidades independentes e contratos explícitos, permitindo extração futura de serviços quando necessário.

## 5.2. Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Backend | NestJS |
| Linguagem | TypeScript |
| Frontend | React |
| Build frontend | Vite |
| Estilização | Tailwind CSS |
| Banco | PostgreSQL |
| ORM | Prisma |
| Filas | Redis + BullMQ |
| Validação | Zod |
| API Docs | OpenAPI / Swagger |
| Backend Tests | Jest |
| Frontend Tests | Vitest |
| E2E | Playwright |
| Containers | Docker |
| CI/CD | GitHub Actions |
| Logs | Pino |
| Observabilidade futura | OpenTelemetry |
| Monorepo | pnpm Workspaces + Turborepo |

## 5.3. Diagrama geral

```
                  OPERATORS
                      |
                      v
                NEXVIAN API
                      |
          +-----------+-----------+
          |                       |
          v                       v
    AUTH / TENANTS           API VALIDATION
          |                       |
          +-----------+-----------+
                      |
                      v
              TRANSACTION ENGINE
                      |
             +--------+--------+
             |                 |
             v                 v
       RISK ENGINE       IDEMPOTENCY
             |                 |
             +--------+--------+
                      |
                      v
              PAYMENT ROUTER
                      |
              PROVIDER ENGINE
                      |
          +-----------+-----------+
          |                       |
          v                       v
     CARD PROVIDERS         LOCAL METHODS
          |                       |
          +-----------+-----------+
                      |
                      v
               TRANSACTION RESULT
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
        LEDGER     WEBHOOKS   RECONCILIATION
          |           |           |
          +-----------+-----------+
                      |
                      v
                DASHBOARDS
```

## 5.4. Princípios técnicos

### PostgreSQL

Será a fonte de verdade para transações, contas, lançamentos, usuários e configurações.

### Redis

Será utilizado para filas, cache e coordenação de tarefas. Nunca será a fonte de verdade dos dados financeiros.

### Dinheiro

Todos os valores serão armazenados como inteiros na menor unidade da moeda.

Exemplo:

```
{
  amount: 15000,
  currency: "BRL"
}
```

Representa R$ 150,00.

Nunca utilizar `float` ou `double` para cálculos financeiros.

### Idempotência

Operações financeiras precisam impedir duplicidades.

Uma mesma requisição com a mesma chave de idempotência, dentro do escopo definido, não poderá gerar múltiplos efeitos financeiros.

### Outbox Pattern

Eventos financeiros importantes serão gravados na mesma transação de banco de dados que altera o estado correspondente.

A publicação será realizada posteriormente por um worker.

### Ledger

O ledger utilizará partidas dobradas.

Lançamentos contabilizados serão imutáveis. Correções deverão utilizar lançamentos compensatórios.

### Timeouts

Quando um provedor não responder e não for possível determinar o resultado, a transação deverá assumir um estado de incerteza, como `UNKNOWN`.

Não devemos assumir automaticamente que um pagamento falhou.