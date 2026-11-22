# ADR-001 — Monólito modular

**Status:** Aceito

## Contexto
A primeira versão é desenvolvida por dois desenvolvedores e precisa demonstrar o fluxo completo em sandbox.

## Decisão
Utilizar um monólito modular (NestJS), com módulos coesos e contratos explícitos entre eles.

## Consequências
- Menor complexidade operacional no início (um deploy, uma base).
- Separação clara entre domínios permite extrair serviços no futuro.
- Microserviços só com aprovação explícita (ver `AGENTS.md`).
