## 15.1. Pré-requisitos

- Node.js em versão LTS compatível com as dependências.
- Git.
- Docker Desktop.
- pnpm.
- Editor de código.
- Conta GitHub.

Verificar instalações:

```
node -v
npm -v
git --version
docker --version
```

Instalar pnpm:

```
npm install -g pnpm
```

## 15.2. Criar projeto

```
mkdir nexvian
cd nexvian

git init

mkdir apps
mkdir packages
mkdir infrastructure
mkdir docs
mkdir scripts

mkdir apps/api
mkdir apps/dashboard

mkdir packages/contracts
mkdir packages/sdk
mkdir packages/shared
mkdir packages/ui
mkdir packages/provider-adapters

mkdir docs/business
mkdir docs/architecture
mkdir docs/api
mkdir docs/security
mkdir docs/compliance
mkdir docs/decisions
mkdir docs/sprints
```

## 15.3. Criar monorepo

`pnpm-workspace.yaml`:

```
packages:
  - "apps/*"
  - "packages/*"
```

Configurar os scripts e dependências de desenvolvimento na raiz.

Inicializar backend:

```
cd apps/api
pnpm dlx @nestjs/cli new . --package-manager pnpm
```

Inicializar frontend:

```
cd ../dashboard
pnpm create vite . --template react-ts
```

Instalar dependências conforme as necessidades dos módulos e configurar as versões no lockfile.

## 15.4. Docker Compose

Arquivo `docker-compose.yml` inicial:

```
services:
  postgres:
    image: postgres:17-alpine
    container_name: nexvian-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: nexvian
      POSTGRES_PASSWORD: local_dev_password
      POSTGRES_DB: nexvian
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: nexvian-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

As imagens acima são uma base inicial. Antes de iniciar, verificar versões suportadas e fixar as versões escolhidas.

Executar:

```
docker compose up -d
```

Verificar:

```
docker compose ps
```

**Importante:** as credenciais acima são exclusivamente locais. Não reutilizar em ambientes compartilhados ou produção. O arquivo real de configuração deverá utilizar variáveis de ambiente e ficar fora do Git.

---

# 16. DOCUMENTAÇÃO DE DECISÕES — ADRs

As principais decisões técnicas deverão ser registradas em `docs/decisions/`.

## ADR-001 — Modular Monolith

**Decisão:** utilizar monólito modular.

**Motivo:** reduzir complexidade operacional no início e manter separação clara entre domínios.

## ADR-002 — PostgreSQL

**Decisão:** PostgreSQL como banco principal.

**Motivo:** consistência transacional, integridade e suporte a operações financeiras.

## ADR-003 — Redis + BullMQ

**Decisão:** utilizar Redis e BullMQ para processamento assíncrono.

**Motivo:** filas, retries, processamento de webhooks e tarefas em background.

## ADR-004 — Ledger de partidas dobradas

**Decisão:** utilizar double-entry ledger.

**Motivo:** rastreabilidade, consistência e auditoria financeira.

## ADR-005 — Provider Adapter Pattern

**Decisão:** utilizar adapters independentes por provedor.

**Motivo:** reduzir acoplamento e permitir substituição ou adição de provedores.

## ADR-006 — Sandbox First

**Decisão:** desenvolver primeiro exclusivamente em sandbox.

**Motivo:** validar a tecnologia sem movimentar dinheiro real ou assumir operações não autorizadas.

---

# 17. FLUXO PRINCIPAL DA NEXVIAN

O fluxo mais importante da primeira versão deverá funcionar da seguinte maneira:

```
1. Operator Login
       |
2. Create Payment Intent
       |
3. Validate Tenant
       |
4. Validate API Key
       |
5. Check Idempotency
       |
6. Validate Payment Data
       |
7. Risk Evaluation
       |
8. Select Provider
       |
9. Process Payment in Sandbox
       |
10. Receive Provider Result
       |
11. Update Transaction
       |
12. Create Ledger Entries
       |
13. Publish Event via Outbox
       |
14. Dispatch Webhook
       |
15. Reconciliation
       |
16. Display on Dashboard
```

## Critério de sucesso

A Nexvian 0.1.0 deverá permitir demonstrar todo esse fluxo utilizando provedores simulados, sem qualquer movimentação de dinheiro real.

---

# 18. DEFINIÇÃO DA PRIMEIRA RELEASE

## Nexvian 0.1.0 — Sandbox

Funcionalidades mínimas:

- [ ]  
    
    Autenticação.
    
- [ ]  
    
    Multi-tenancy.
    
- [ ]  
    
    API Keys.
    
- [ ]  
    
    Payment Intents.
    
- [ ]  
    
    Transaction Engine.
    
- [ ]  
    
    Idempotência.
    
- [ ]  
    
    Ledger.
    
- [ ]  
    
    Provider Registry.
    
- [ ]  
    
    Simulador de cartões.
    
- [ ]  
    
    Simulador de métodos locais.
    
- [ ]  
    
    Payment Routing.
    
- [ ]  
    
    Webhooks.
    
- [ ]  
    
    Outbox.
    
- [ ]  
    
    Reconciliation.
    
- [ ]  
    
    Admin Dashboard.
    
- [ ]  
    
    Operator Dashboard.
    
- [ ]  
    
    Relatórios básicos.
    
- [ ]  
    
    OpenAPI.
    
- [ ]  
    
    Testes unitários.
    
- [ ]  
    
    Testes de integração.
    
- [ ]  
    
    Testes E2E.
    
- [ ]  
    
    Docker.
    
- [ ]  
    
    CI/CD.
    
- [ ]  
    
    Documentação.
    

## Critérios finais

A versão somente será considerada concluída quando:

1. O fluxo completo estiver funcional.
2. Os dados dos operadores estiverem isolados.
3. Operações idempotentes estiverem testadas.
4. O ledger estiver consistente.
5. Os webhooks estiverem funcionando.
6. A conciliação conseguir identificar divergências.
7. Os testes críticos estiverem aprovados.
8. A documentação estiver atualizada.
9. A release estiver disponível em sandbox.

**Resultado esperado: Nexvian 0.1.0 — primeira versão técnica demonstrável.**

---

# 19. PRÓXIMA ETAPA

A execução deverá começar pelo Sprint 0.

A prioridade não é desenvolver funcionalidades financeiras imediatamente, mas criar uma fundação confiável.

Ordem recomendada:

1. Criar repositório `nexvian-platform`.
2. Criar estrutura do monorepo.
3. Configurar backend e frontend.
4. Configurar PostgreSQL e Redis.
5. Configurar Docker.
6. Criar documentação.
7. Configurar GitHub Actions.
8. Criar primeiros Pull Requests.
9. Validar o ambiente dos dois desenvolvedores.
10. Iniciar Sprint 1.

**Visão final:** construir a Nexvian como uma infraestrutura internacional de pagamentos, preparada para crescer de um MVP em sandbox para uma plataforma B2B robusta, com segurança, rastreabilidade e capacidade de integração com múltiplos provedores.