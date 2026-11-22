# ADR-003 — Redis + BullMQ

**Status:** Aceito

## Contexto
Webhooks, outbox e tarefas em background exigem filas com retry e backoff.

## Decisão
Utilizar Redis com BullMQ para processamento assíncrono, cache e coordenação.

## Consequências
- Filas, retries, DLQ e processamento de webhooks em background.
- Redis **nunca** é fonte de verdade de dados financeiros; o estado vive no PostgreSQL.
