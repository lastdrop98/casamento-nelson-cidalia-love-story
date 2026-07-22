export function GoldDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <span className="h-px w-16 sm:w-24 bg-[var(--gold)]/60" />
      {label && (
        <span className="text-[var(--gold)] uppercase tracking-[0.35em] text-xs">
          {label}
        </span>
      )}
      <span className="h-px w-16 sm:w-24 bg-[var(--gold)]/60" />
    </div>
  );
}
