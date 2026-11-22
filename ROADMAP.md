**Objetivo:** entregar uma primeira versão técnica funcional em sandbox.

A estimativa pressupõe dois desenvolvedores trabalhando continuamente. Não representa prazo garantido para homologação regulatória ou comercial.

## Sprint 0 — Foundation & Architecture

**Semana 1**

- Criar monorepo.
- Configurar pnpm Workspaces.
- Configurar Turborepo.
- Inicializar NestJS.
- Inicializar React + Vite.
- Configurar TypeScript.
- Configurar PostgreSQL.
- Configurar Redis.
- Criar Docker Compose.
- Configurar ESLint e Prettier.
- Configurar GitHub Actions.
- Criar documentação inicial.
- Definir ADRs.

**Entrega:** ambiente local funcionando.

## Sprint 1 — Authentication & Multi-tenancy

**Semana 2**

- Criar Tenant.
- Criar User.
- Implementar login.
- Implementar JWT.
- Implementar refresh token.
- Implementar RBAC.
- Criar API Keys.
- Implementar rotação e revogação.
- Garantir isolamento de tenants.
- Criar testes de autorização.

**Entrega:** autenticação e isolamento funcional.

## Sprint 2 — Transaction Engine

**Semana 3**

- Criar Payment Intent.
- Criar Transaction.
- Definir estados.
- Implementar idempotência.
- Criar histórico de eventos.
- Implementar cancelamento.
- Tratar concorrência.
- Implementar timeout.
- Implementar estado UNKNOWN.
- Criar testes de integração.

**Entrega:** ciclo de vida de transações funcional.

## Sprint 3 — Ledger Engine

**Semana 4**

- Criar Ledger Account.
- Criar Ledger Entry.
- Implementar partidas dobradas.
- Implementar lançamentos.
- Implementar compensações.
- Garantir atomicidade.
- Implementar integridade contábil.
- Criar testes financeiros.

**Entrega:** motor financeiro interno.

## Sprint 4 — Provider Engine

**Semana 5**

- Criar interface Provider.
- Criar Provider Registry.
- Criar Provider Factory.
- Criar Adapter Pattern.
- Implementar simulador de cartões.
- Implementar simulador de métodos locais.
- Simular sucesso.
- Simular falha.
- Simular timeout.
- Normalizar respostas.

**Entrega:** integrações simuladas funcionando.

## Sprint 5 — Payment Routing Engine

**Semana 6**

- Criar Routing Rules.
- Criar seleção de provedores.
- Implementar regras por país.
- Implementar regras por moeda.
- Implementar regras por método.
- Implementar limites.
- Considerar disponibilidade.
- Considerar custos.
- Implementar circuit breaker.
- Implementar fallback controlado.

**Entrega:** roteamento automático.

## Sprint 6 — Webhooks & Async Processing

**Semana 7**

- Configurar BullMQ.
- Implementar Outbox Pattern.
- Criar Webhook Endpoint.
- Criar Webhook Delivery.
- Implementar assinatura HMAC.
- Implementar retry.
- Implementar backoff.
- Criar Dead Letter Queue.
- Implementar idempotência de eventos.

**Entrega:** processamento assíncrono e notificações.

## Sprint 7 — Admin Dashboard

**Semana 8**

- Criar layout administrativo.
- Criar autenticação frontend.
- Listar tenants.
- Gerenciar operadores.
- Gerenciar usuários.
- Gerenciar permissões.
- Visualizar provedores.
- Visualizar auditoria.
- Criar métricas administrativas.

**Entrega:** painel administrativo funcional.

## Sprint 8 — Operator Dashboard

**Semana 9**

- Criar painel do operador.
- Listar transações.
- Visualizar detalhes.
- Gerenciar API Keys.
- Gerenciar webhooks.
- Exibir métricas.
- Criar relatórios.
- Implementar filtros.
- Implementar exportações.

**Entrega:** painel do cliente funcional.

## Sprint 9 — Reconciliation Engine

**Semana 10**

- Criar importação CSV.
- Criar Reconciliation Batch.
- Criar Reconciliation Item.
- Implementar matching.
- Detectar duplicidades.
- Detectar divergências.
- Criar relatórios.
- Registrar histórico.

**Entrega:** conciliação funcional com dados simulados.

## Sprint 10 — Security & QA

**Semana 11**

- Testar isolamento entre tenants.
- Testar idempotência concorrente.
- Testar ledger.
- Testar webhooks.
- Testar filas.
- Testar permissões.
- Implementar rate limiting.
- Revisar secrets.
- Testar backup e restore.
- Testar carga.
- Revisar logs.
- Corrigir vulnerabilidades.

**Entrega:** versão candidata a release.

## Sprint 11 — Homologação & Sandbox Release

**Semana 12**

- Revisar OpenAPI.
- Finalizar documentação.
- Criar SDK inicial.
- Executar testes E2E.
- Corrigir bugs.
- Preparar deploy.
- Configurar ambiente sandbox.
- Criar release.
- Preparar demonstração.

**Entrega:** Nexvian 0.1.0 Sandbox.