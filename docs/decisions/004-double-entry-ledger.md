# ADR-004 — Ledger de partidas dobradas

**Status:** Aceito

## Contexto
É necessário rastrear e auditar todos os movimentos financeiros.

## Decisão
Utilizar um ledger de partidas dobradas (double-entry).

## Consequências
- Todo lançamento tem débito e crédito que se equilibram.
- Lançamentos contabilizados são imutáveis; correções usam lançamentos compensatórios.
- Valores em inteiros na menor unidade da moeda, sempre com moeda ISO 4217.
