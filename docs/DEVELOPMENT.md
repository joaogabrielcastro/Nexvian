# Desenvolvimento local

Guia rápido para rodar o monorepo da Nexvian (Sprint 0 — Foundation).

## Pré-requisitos

- Node.js 22 (ver `.nvmrc`)
- pnpm 10 (`corepack enable` ou `npm install -g pnpm`)
- Docker Desktop

## Primeira execução

```bash
pnpm install

# Variáveis locais (nunca commitar .env)
cp .env.example .env
cp apps/api/.env.example apps/api/.env

# PostgreSQL + Redis
pnpm infra:up

# API (http://localhost:3000/v1) + Dashboard (http://localhost:5173)
pnpm dev
```

Verificar a API:

```bash
curl -i http://localhost:3000/v1/health
```

- `200` + `"status": "ok"` → PostgreSQL e Redis acessíveis.
- `503` + `"status": "degraded"` → alguma dependência fora do ar (o corpo indica qual).

### Conflito de portas

Se outra aplicação já usa `5432` ou `6379`, altere `POSTGRES_PORT` / `REDIS_PORT` no `.env` da raiz
e ajuste `DATABASE_URL` / `REDIS_URL` em `apps/api/.env` para as mesmas portas.

## Estrutura

```
apps/
  api/          NestJS 12 (ESM) — Prisma 7, Redis, Pino, Zod
  dashboard/    React 19 + Vite 8 + Tailwind 4
packages/
  contracts/    Schemas Zod e tipos compartilhados entre API e dashboard
docs/
  decisions/    ADRs
```

## Comandos

| Comando             | O que faz                                          |
| ------------------- | -------------------------------------------------- |
| `pnpm dev`          | Sobe API e dashboard em modo watch                 |
| `pnpm build`        | Build de todos os pacotes (Turborepo)              |
| `pnpm typecheck`    | Verificação de tipos                               |
| `pnpm test`         | Testes unitários e e2e (Vitest)                    |
| `pnpm lint`         | ESLint                                             |
| `pnpm format`       | Prettier                                           |
| `pnpm db:generate`  | Gera o Prisma Client                               |
| `pnpm db:migrate`   | Cria/aplica migrations (`prisma migrate dev`)      |
| `pnpm infra:up/down`| Sobe/derruba PostgreSQL e Redis                    |

## Convenções da API

- Prefixo global `/v1`.
- Configuração validada com Zod no boot (`apps/api/src/config/env.ts`); a API não sobe com env inválido.
- Logs estruturados (Pino) com `authorization` e `cookie` mascarados.
- Header `x-correlation-id`: reaproveitado se válido (`[A-Za-z0-9._-]{1,128}`), senão gerado; sempre devolvido na resposta.
- Conexões com PostgreSQL e Redis são lazy: a API sobe mesmo com dependências fora do ar e reporta pelo `/v1/health`.

## CI

`.github/workflows/ci.yml` roda em push para `main`/`develop` e em pull requests:
format check → lint → typecheck → test → build.
