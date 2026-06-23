import { useBundleCartStore } from '@/entities/bundle/model/bundleCart.store';
import { cn } from '@/shared/lib/cn';

type SaveSystemActionsProps = {
  className?: string;
};

export function SaveSystemActions({ className }: SaveSystemActionsProps) {
  const hasSavedSystem = useBundleCartStore(
    (state) => state.saveSystemForLaterEnabled,
  );
  const saveSystemForLater = useBundleCartStore(
    (state) => state.saveSystemForLater,
  );
  const clearSavedSystem = useBundleCartStore(
    (state) => state.clearSavedSystem,
  );

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <button
        type="button"
        className="rounded-sm text-base font-medium text-text underline decoration-text-soft/60 underline-offset-4 italic transition-colors outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        aria-pressed={hasSavedSystem}
        onClick={saveSystemForLater}
      >
        {hasSavedSystem ? 'System saved — update saved copy' : 'Save my system for later'}
      </button>

      {hasSavedSystem ? (
        <button
          type="button"
          className="rounded-sm text-sm font-medium text-danger underline-offset-4 transition-colors outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          onClick={clearSavedSystem}
        >
          Clear saved system
        </button>
      ) : null}
    </div>
  );
}
