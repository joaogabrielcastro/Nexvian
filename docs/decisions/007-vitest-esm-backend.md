# ADR-007 — Vitest no backend (NestJS 12 ESM)

**Status:** Proposto — requer aprovação da equipe

## Contexto
A documentação original define Jest para testes de backend. Porém, o NestJS 12 (versão atual)
é distribuído **somente como ESM** e o próprio starter oficial (`nest new`) já gera projetos com
Vitest. Jest com ESM exige `--experimental-vm-modules` e configuração adicional de transformação,
com suporte ainda instável.

## Decisão
Utilizar **Vitest** tanto no backend quanto no frontend, mantendo a API em ESM.

## Consequências
- Uma única ferramenta de testes no monorepo (mesma API `describe/it/expect/vi`).
- Alinhado ao starter oficial do NestJS 12.
- Testes de integração/e2e da API usam `@nestjs/testing` + `supertest` com Vitest.
- Caso a equipe prefira manter Jest, será necessário configurar Jest em modo ESM experimental.

## Versões fixadas no Sprint 0
- TypeScript `~6.0`: `typescript-eslint` ainda não suporta TypeScript 7.
- Prisma `~7.10`: a tag `latest` do npm aponta para a 8.0 em release candidate.
