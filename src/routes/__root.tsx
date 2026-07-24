import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { BottomNav } from "@/components/wedding/BottomNav";
import { Signature } from "@/components/wedding/Signature";
import { music } from "@/lib/music";
import { fetchWedding, signUrl } from "@/lib/wedding";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-script text-6xl text-[var(--gold)]">Ops</p>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-[var(--gold)] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--primary-foreground)]"
          >
            Voltar ao Convite
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Algo correu mal</h1>
        <div className="mt-6">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border border-[var(--gold)] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--primary-foreground)]"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nelson & Cidália — 27 de Novembro de 2026" },
      { property: "og:title", content: "Nelson & Cidália — 27 de Novembro de 2026" },
      { name: "twitter:title", content: "Nelson & Cidália — 27 de Novembro de 2026" },
      { name: "description", content: "Com imensa alegria, convidamos você a celebrar connosco o nosso casamento no dia 27 de Novembro de 2026. #NelsonCidalia2026" },
      { property: "og:description", content: "Com imensa alegria, convidamos você a celebrar connosco o nosso casamento no dia 27 de Novembro de 2026. #NelsonCidalia2026" },
      { name: "twitter:description", content: "Com imensa alegria, convidamos você a celebrar connosco o nosso casamento no dia 27 de Novembro de 2026. #NelsonCidalia2026" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Great+Vibes&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function MusicLoader() {
  const q = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding });
  const musicPath = q.data?.music_path ?? null;
  const urlQ = useQuery({
    queryKey: ["music", musicPath],
    queryFn: () => signUrl("wedding-audio", musicPath),
    enabled: !!musicPath,
  });
  useEffect(() => {
    if (urlQ.data) music.setSrc(urlQ.data);
  }, [urlQ.data]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <MusicLoader />
      <Outlet />
      <BottomNav />
      <Signature />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
