# Nexvian - AI Development Guidelines

## Project Context

Nexvian is a B2B payment orchestration platform
for legally authorized iGaming operators.

Initial scope:
- Cards
- Local payment methods
- Sandbox integrations only

Cryptocurrencies and blockchain are out of scope.

## Technology Stack

- NestJS
- TypeScript
- React
- Vite
- PostgreSQL
- Prisma
- Redis
- BullMQ
- Zod
- Jest
- Vitest
- Playwright
- Docker

## Architecture

- Follow modular monolith architecture.
- Keep business logic outside controllers.
- Use dependency injection.
- Keep modules cohesive.
- Avoid unnecessary abstractions.
- Follow established project patterns.
- Do not introduce microservices without approval.

## Financial Rules

- Never use floating-point numbers for money.
- Store monetary values as integers in minor units.
- Always specify currency.
- Implement idempotency for financial commands.
- Never mutate posted ledger entries.
- Use compensating entries for corrections.
- Use database transactions for financial consistency.
- Never assume a provider timeout means payment failure.
- Preserve UNKNOWN transaction states when necessary.

## Security

- Enforce tenant isolation.
- Validate authorization on every protected operation.
- Never expose secrets.
- Never store raw card PAN or CVV.
- Verify provider webhook signatures.
- Apply input validation.
- Avoid logging sensitive information.
- Use least privilege.

## Database

- Use Prisma.
- Create migrations for schema changes.
- Never modify production schema manually.
- Add indexes where justified.
- Maintain tenant boundaries.
- Preserve financial auditability.

## Testing

- Generate unit tests.
- Generate integration tests.
- Cover failure scenarios.
- Test concurrent idempotency.
- Test tenant isolation.
- Test ledger balancing.
- Test webhook signatures.

Never claim tests passed unless they were executed.

## AI Behavior

Before modifying code:
1. Inspect the existing architecture.
2. Read relevant modules.
3. Understand current contracts.
4. Identify dependencies.
5. Avoid inventing API contracts.
6. Explain potentially breaking changes.

After implementation:
1. Run relevant tests.
2. Report files changed.
3. Report tests executed.
4. Identify remaining risks.
5. Update documentation when needed.

## Scope Restrictions

- Sandbox only.
- No real-money processing.
- No cryptocurrency functionality.
- No unapproved real payment providers.