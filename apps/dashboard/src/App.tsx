import type { DependencyStatus, HealthResponse } from '@nexvian/contracts';
import { useEffect, useState } from 'react';
import { fetchHealth } from './services/health';

type HealthState =
  { kind: 'loading' } | { kind: 'loaded'; data: HealthResponse } | { kind: 'error' };

function StatusBadge({ label, status }: { label: string; status: DependencyStatus }) {
  const color = status === 'up' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800';
  return (
    <li className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
      <span className="font-medium text-slate-700">{label}</span>
      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${color}`}>{status}</span>
    </li>
  );
}

export function App() {
  const [health, setHealth] = useState<HealthState>({ kind: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    fetchHealth(controller.signal)
      .then((data) => setHealth({ kind: 'loaded', data }))
      .catch(() => {
        if (!controller.signal.aborted) setHealth({ kind: 'error' });
      });
    return () => controller.abort();
  }, []);

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-bold text-slate-900">Nexvian</h1>
      <p className="mt-1 text-sm text-slate-500">Sandbox — status da plataforma</p>

      <section className="mt-6" aria-label="Status da API">
        {health.kind === 'loading' && <p className="text-slate-500">Verificando API…</p>}
        {health.kind === 'error' && (
          <p role="alert" className="text-red-700">
            Não foi possível contatar a API.
          </p>
        )}
        {health.kind === 'loaded' && (
          <ul className="space-y-2">
            <StatusBadge label="PostgreSQL" status={health.data.checks.database} />
            <StatusBadge label="Redis" status={health.data.checks.redis} />
          </ul>
        )}
      </section>
    </main>
  );
}
