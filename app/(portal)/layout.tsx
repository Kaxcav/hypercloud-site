import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PortalHeader } from '@/components/PortalHeader';

// Chrome da área do cliente. Superfície de fundo distinta (`surface-muted`) e
// cabeçalho próprio — é o que torna o portal reconhecível de longe.
export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="relative flex min-h-screen flex-col bg-surface-muted">
      <PortalHeader userName={session?.user?.name} />
      <main className="flex-1 pb-20">{children}</main>
    </div>
  );
}
