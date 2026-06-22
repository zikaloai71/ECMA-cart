import type { BundleProtection } from '@/entities/bundle/model/bundle.types';
import { useBundleCartStore } from '@/entities/bundle/model/bundleCart.store';
import { cn } from '@/shared/lib/cn';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { Button } from '@/shared/ui/button/Button';

type BundleProtectionCardProps = {
  protection: BundleProtection;
  className?: string;
};

export function BundleProtectionCard({
  protection,
  className,
}: BundleProtectionCardProps) {
  const selectedProtectionId = useBundleCartStore(
    (state) => state.selectedProtectionId,
  );
  const toggleProtectionSelection = useBundleCartStore(
    (state) => state.toggleProtectionSelection,
  );
  const added = selectedProtectionId === protection.id;

  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-card bg-surface p-5 shadow-card transition-colors',
        added && 'ring-2 ring-primary',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
            {protection.coverageType.replace('-', ' ')}
          </p>
          <h3 className="mt-1 text-xl font-bold text-text">
            {protection.name}
          </h3>
        </div>

        <div className="text-right">
          {protection.offerPrice ? (
            <p className="text-sm text-danger line-through">
              {formatCurrency(protection.price)}
            </p>
          ) : null}
          <p className="text-2xl font-bold text-text">
            {formatCurrency(protection.offerPrice ?? protection.price)}
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-text-muted">
        {protection.description}
      </p>

      <p className="mt-3 text-sm font-medium text-primary">
        Coverage term: {protection.term}
      </p>

      <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm text-text">
        {protection.benefits.map((benefit) => (
          <li key={benefit} className="flex gap-2">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <Button
          variant={added ? 'primary' : 'secondary'}
          fullWidth
          onClick={() => toggleProtectionSelection(protection.id)}
        >
          {added ? 'Added' : 'Add protection'}
        </Button>
      </div>
    </article>
  );
}
