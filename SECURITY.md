## 8.1. Autenticação e autorização

- JWT com access token de curta duração.
- Refresh tokens com rotação e revogação.
- RBAC.
- API Keys para integrações.
- Separação de ambientes.
- MFA para usuários administrativos.

## 8.2. Multi-tenancy

Nenhum operador poderá acessar dados de outro operador.

A validação deverá ocorrer na camada de aplicação e ser reforçada por políticas de banco de dados quando apropriado.

## 8.3. Cartões

A Nexvian deverá priorizar:

- Hosted Checkout.
- Hosted Fields.
- Tokenização pelo PSP.
- Redução do escopo PCI DSS.

Não armazenar PAN ou CVV.

Utilizar um provedor externo não elimina automaticamente as responsabilidades PCI DSS da plataforma.

## 8.4. Webhooks

- Assinatura HMAC.
- Validação de origem quando aplicável.
- Timestamp e proteção contra replay.
- Retry com backoff.
- Identificador único do evento.
- Registro de tentativas.
- Dead Letter Queue.

## 8.5. Infraestrutura

- Secrets fora do repositório.
- HTTPS.
- Rate limiting.
- Proteção contra brute force.
- Logs sem dados sensíveis.
- Backup automatizado.
- Testes de restauração.
- Auditoria.
- Monitoramento de erros.