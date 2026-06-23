import { useBundleCartSummary } from '@/widgets/review-panel/model/useBundleCartSummary';
import { ReviewEmptyState } from '@/widgets/review-panel/ui/ReviewEmptyState';
import { ReviewProductRow } from '@/widgets/review-panel/ui/ReviewProductRow';
import { ReviewSection } from '@/widgets/review-panel/ui/ReviewSection';
import { ReviewSubscriptionRow } from '@/widgets/review-panel/ui/ReviewSubscriptionRow';
import { ReviewSummary } from '@/widgets/review-panel/ui/ReviewSummary';
import { useBundleCartStore } from '@/entities/bundle/model/bundleCart.store';

export function ReviewPanel() {
  const summary = useBundleCartSummary();
  const removePlan = useBundleCartStore((state) => state.removePlan);
  const removeProtection = useBundleCartStore(
    (state) => state.removeProtection,
  );

  return (
    <aside className="rounded-card border border-border bg-selected-bg p-6 shadow-card lg:sticky lg:top-6">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">
          Review
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-[-0.02em] text-text">
          Your security system
        </h2>
        <p className="mt-2 text-sm leading-6 text-text-muted">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </header>

      {summary.isEmpty ? (
        <ReviewEmptyState />
      ) : (
        <>
          <div className="flex flex-col gap-6">
            <ReviewSection title="Cameras" hidden={summary.cameras.length === 0}>
              {summary.cameras.map((line) => (
                <ReviewProductRow key={line.selectionKey} line={line} />
              ))}
            </ReviewSection>

            <ReviewSection title="Sensors" hidden={summary.sensors.length === 0}>
              {summary.sensors.map((line) => (
                <ReviewProductRow key={line.selectionKey} line={line} />
              ))}
            </ReviewSection>

            <ReviewSection title="Plan" hidden={summary.plan === null}>
              {summary.plan ? (
                <ReviewSubscriptionRow
                  name={summary.plan.name}
                  priceSuffix={`/${summary.plan.billingPeriod}`}
                  comparePrice={summary.plan.comparePrice}
                  finalPrice={summary.plan.finalPrice}
                  removeLabel="Remove plan from your system"
                  onRemove={removePlan}
                />
              ) : null}
            </ReviewSection>

            <ReviewSection
              title="Protection"
              hidden={summary.protection === null}
            >
              {summary.protection ? (
                <ReviewSubscriptionRow
                  name={summary.protection.name}
                  comparePrice={summary.protection.comparePrice}
                  finalPrice={summary.protection.finalPrice}
                  removeLabel="Remove protection from your system"
                  onRemove={removeProtection}
                />
              ) : null}
            </ReviewSection>
          </div>

          <div className="mt-6">
            <ReviewSummary summary={summary} />
          </div>
        </>
      )}
    </aside>
  );
}
