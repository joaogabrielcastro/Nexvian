Criar um projeto no GitHub Projects com o nome:

**Nexvian Development**

## Status

```
Backlog
Ready
In Progress
Review
Done
```

## Campos personalizados

| Campo | Tipo |
| --- | --- |
| Sprint | Seleção |
| Assignee | Pessoa |
| Priority | Seleção |
| Module | Seleção |
| Estimate | Número |
| Acceptance Criteria | Texto |
| Dependencies | Relação |

## Prioridades

- P0: Crítico.
- P1: Alta.
- P2: Média.
- P3: Baixa.

## Exemplo de tarefa

**Título:** Implement Tenant Isolation Middleware

Descrição:

Criar middleware ou mecanismo equivalente para garantir que todas as requisições autenticadas sejam executadas no contexto do tenant correto.

Critérios de aceitação:

- Tenant identificado pelo contexto autenticado.
- Nenhuma consulta acessa dados de outro tenant.
- Testes de isolamento implementados.
- Tentativas de acesso cruzado são bloqueadas.
- Logs de auditoria disponíveis quando necessário.

Prioridade: P0.

Sprint: 1.

Módulo: Tenants.