# ADR-002 — PostgreSQL

**Status:** Aceito

## Contexto
A plataforma lida com transações financeiras e precisa de consistência forte.

## Decisão
PostgreSQL é o banco principal e a fonte de verdade, acessado via Prisma (com migrations versionadas).

## Consequências
- Transações ACID, integridade referencial e restrições de unicidade (ex.: idempotência).
- Toda mudança de schema passa por migration; nada é alterado manualmente em produção.
