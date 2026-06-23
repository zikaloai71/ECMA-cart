import type { BundleCartSummary } from '@/entities/bundle/model/cart.summary';
import { CheckoutButton } from '@/features/checkout/ui/CheckoutButton';
import { SaveSystemActions } from '@/features/save-system/ui/SaveSystemActions';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import {
  GuaranteeBadge,
  ShippingTruckIcon,
} from '@/widgets/review-panel/ui/icons';

type ReviewSummaryProps = {
  summary: BundleCartSummary;
};

// Shipping is a static, always-free perk in this bundle.
const SHIPPING_COMPARE_PRICE = 5.99;

export function ReviewSummary({ summary }: ReviewSummaryProps) {
  const hasSavings = summary.savings > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-t border-border pt-5">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-primary"
          aria-hidden="true"
        >
          <ShippingTruckIcon />
        </span>
        <p className="flex-1 text-base font-semibold text-text">Fast Shipping</p>
        <div className="text-right">
          <p className="text-sm leading-none text-text-soft line-through">
            {formatCurrency(SHIPPING_COMPARE_PRICE)}
          </p>
          <p className="mt-1 text-base font-bold uppercase leading-none text-primary">
            Free
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 border-t border-border pt-6">
        <GuaranteeBadge />

        <div className="flex flex-col items-end gap-2 text-right">
          <span className="rounded-pill bg-primary px-3 py-1 text-sm font-semibold text-text-inverse">
            as low as {formatCurrency(summary.monthlyOverYear)}/mo
          </span>
          <div className="flex items-baseline gap-2">
            {hasSavings ? (
              <span className="text-xl leading-none text-danger line-through">
                {formatCurrency(summary.compareTotal)}
              </span>
            ) : null}
            <span className="text-3xl font-bold tracking-[-0.02em] text-primary">
              {formatCurrency(summary.finalTotal)}
            </span>
          </div>
        </div>
      </div>

      {hasSavings ? (
        <p className="text-center text-sm  font-semibold text-success">
          Congrats! You&apos;re saving {formatCurrency(summary.savings)} on your security bundle!
        </p>
      ) : null}

      <CheckoutButton summary={summary} />

      <SaveSystemActions />
    </div>
  );
}
