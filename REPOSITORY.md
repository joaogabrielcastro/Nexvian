nexvian/
│
├── apps/
│   ├── api/
│   │   └── src/
│   │       ├── modules/
│   │       │   ├── auth/
│   │       │   ├── tenants/
│   │       │   ├── users/
│   │       │   ├── operators/
│   │       │   ├── transactions/
│   │       │   ├── ledger/
│   │       │   ├── providers/
│   │       │   ├── routing/
│   │       │   ├── webhooks/
│   │       │   ├── reconciliation/
│   │       │   ├── risk/
│   │       │   └── reports/
│   │       └── main.ts
│   │
│   └── dashboard/
│       └── src/
│           ├── components/
│           ├── layouts/
│           ├── pages/
│           │   ├── admin/
│           │   └── operator/
│           ├── hooks/
│           ├── services/
│           ├── stores/
│           └── types/
│
├── packages/
│   ├── contracts/
│   ├── sdk/
│   ├── shared/
│   ├── ui/
│   └── provider-adapters/
│
├── infrastructure/
│   ├── docker/
│   ├── monitoring/
│   └── deployment/
│
├── docs/
│   ├── business/
│   ├── architecture/
│   ├── api/
│   ├── security/
│   ├── compliance/
│   ├── decisions/
│   └── sprints/
│
├── scripts/
├── .github/
│   └── workflows/
│
├── AGENTS.md
├── docker-compose.yml
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
├── README.md
└── .env.example