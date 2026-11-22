# ADR-005 — Provider Adapter Pattern

**Status:** Aceito

## Contexto
A Nexvian integra vários provedores de pagamento com APIs diferentes.

## Decisão
Cada provedor é integrado por um adapter independente que implementa uma interface comum.

## Consequências
- Baixo acoplamento entre o Transaction Engine e os provedores.
- Adicionar ou substituir provedores não altera o domínio.
- Respostas são normalizadas, incluindo timeouts tratados como estado `UNKNOWN`.
