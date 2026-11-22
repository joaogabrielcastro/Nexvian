## 12.1. Branches

```
main
develop
feature/*
fix/*
```

Regras:

- Não realizar commits diretamente na `main`.
- Desenvolver em branches.
- Abrir Pull Requests.
- Exigir revisão humana.
- Executar CI antes do merge.
- Manter histórico organizado.

## 12.2. Padrão de commits

```
feat: add payment intent module
fix: prevent duplicate transactions
refactor: improve provider adapter
test: add ledger integration tests
docs: update API documentation
chore: configure docker environment
```

## 12.3. Rotina semanal

| Dia | Atividade |
| --- | --- |
| Segunda | Planejamento e divisão |
| Terça | Desenvolvimento |
| Quarta | Integração |
| Quinta | Testes e revisão |
| Sexta | Demonstração e retrospectiva |

## 12.4. Definition of Done

Uma tarefa só poderá ser considerada concluída quando:

- Implementação finalizada.
- Código revisado.
- Testes adicionados.
- Testes executados.
- Validações implementadas.
- Documentação atualizada.
- Sem secrets no código.
- Sem erros críticos.
- Pull Request aprovado.
- Critérios de aceitação atendidos.