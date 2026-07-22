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
import { Toaster } from "@/components/ui/sonner";

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
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/0d8ff2bf-6ae8-4f1c-be03-e60d9f480952" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/0d8ff2bf-6ae8-4f1c-be03-e60d9f480952" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
