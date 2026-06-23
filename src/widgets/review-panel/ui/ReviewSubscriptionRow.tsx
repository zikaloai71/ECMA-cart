import { formatCurrency } from '@/shared/lib/formatCurrency';
import { ShieldBrandIcon, TrashIcon } from '@/widgets/review-panel/ui/icons';

type ReviewSubscriptionRowProps = {
  name: string;
  /** Trailing text after the final price, e.g. "/mo" or a coverage term. */
  priceSuffix?: string;
  comparePrice: number;
  finalPrice: number;
  removeLabel: string;
  onRemove: () => void;
};

export function ReviewSubscriptionRow({
  name,
  priceSuffix,
  comparePrice,
  finalPrice,
  removeLabel,
  onRemove,
}: ReviewSubscriptionRowProps) {
  const hasDiscount = finalPrice < comparePrice;

  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0 text-primary" aria-hidden="true">
        <ShieldBrandIcon />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-base font-semibold leading-tight text-text">
          {name}
        </p>
        <button
          type="button"
          className="inline-flex w-fit items-center gap-1 rounded-sm text-xs font-medium text-text-soft transition-colors outline-none hover:text-danger focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <TrashIcon />
          Remove
        </button>
      </div>

      <div className="min-w-0 shrink-0 text-right">
        {hasDiscount ? (
          <p className="text-sm leading-none text-danger line-through">
            {formatCurrency(comparePrice)}
            {priceSuffix}
          </p>
        ) : null}
        <p className="mt-1 text-base font-semibold leading-none text-primary">
          {formatCurrency(finalPrice)}
          {priceSuffix}
        </p>
      </div>
    </div>
  );
}
