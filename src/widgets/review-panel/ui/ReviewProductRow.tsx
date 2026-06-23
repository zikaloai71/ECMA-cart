import { useBundleCartStore } from '@/entities/bundle/model/bundleCart.store';
import type { CartProductLine } from '@/entities/bundle/model/cart.summary';
import { ChangeQuantityControl } from '@/features/change-quantity/ui/ChangeQuantityControl';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { ReviewThumbnail } from '@/widgets/review-panel/ui/ReviewThumbnail';
import { TrashIcon } from '@/widgets/review-panel/ui/icons';

type ReviewProductRowProps = {
  line: CartProductLine;
};

export function ReviewProductRow({ line }: ReviewProductRowProps) {
  const incrementSelectionQuantity = useBundleCartStore(
    (state) => state.incrementSelectionQuantity,
  );
  const decrementSelectionQuantity = useBundleCartStore(
    (state) => state.decrementSelectionQuantity,
  );
  const removeSelection = useBundleCartStore((state) => state.removeSelection);

  const hasDiscount = line.lineFinalPrice < line.lineComparePrice;

  return (
    <div className="flex items-center gap-3">
      <ReviewThumbnail name={line.name} image={line.image} kind={line.kind} />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-base font-semibold leading-tight text-text">
          {line.name}
        </p>
        {line.variantLabel ? (
          <p className="truncate text-xs text-text-muted">{line.variantLabel}</p>
        ) : null}
        <button
          type="button"
          className="inline-flex w-fit items-center gap-1 rounded-sm text-xs font-medium text-text-soft transition-colors outline-none hover:text-danger focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          aria-label={`Remove ${line.name} from your system`}
          onClick={() => removeSelection(line.productId, line.variantId)}
        >
          <TrashIcon />
          Remove
        </button>
      </div>

      <ChangeQuantityControl
        quantity={line.quantity}
        itemName={line.name}
        onDecrease={() =>
          decrementSelectionQuantity(line.productId, line.variantId)
        }
        onIncrease={() =>
          incrementSelectionQuantity(line.productId, line.variantId)
        }
      />

      <div className="min-w-0 shrink-0 text-right">
        {hasDiscount ? (
          <p className="text-sm leading-none text-danger line-through">
            {formatCurrency(line.lineComparePrice)}
          </p>
        ) : null}
        <p className="mt-1 text-base font-semibold leading-none text-primary">
          {formatCurrency(line.lineFinalPrice)}
        </p>
      </div>
    </div>
  );
}
