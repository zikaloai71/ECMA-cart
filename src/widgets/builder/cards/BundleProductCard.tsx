import { useBundleCartStore } from '@/entities/bundle/model/bundleCart.store';
import {
  getBundleSelectionKey,
  productHasCartSelection,
} from '@/entities/bundle/model/bundle.selectors';
import type {
  ProductVisualKind,
  SelectableProduct,
} from '@/entities/product/model/types';
import { getSavingsPercent } from '@/entities/product/model/product.utils';
import { ProductHero } from '@/entities/product/ui/ProductHero';
import { ProductPrice } from '@/entities/product/ui/ProductPrice';
import { ChangeQuantityControl } from '@/features/change-quantity/ui/ChangeQuantityControl';
import { SelectVariantControl } from '@/features/select-variant/ui/SelectVariantControl';
import { cn } from '@/shared/lib/cn';

type BundleProductCardProps = {
  product: SelectableProduct;
  kind: ProductVisualKind;
  className?: string;
};

export function BundleProductCard({
  product,
  kind,
  className,
}: BundleProductCardProps) {
  const storedSelectedVariantId = useBundleCartStore(
    (state) => state.selectedVariantIdsByProductId[product.id] ?? null,
  );
  const selectVariant = useBundleCartStore((state) => state.selectVariant);
  const incrementSelectionQuantity = useBundleCartStore(
    (state) => state.incrementSelectionQuantity,
  );
  const decrementSelectionQuantity = useBundleCartStore(
    (state) => state.decrementSelectionQuantity,
  );
  const selectedVariantId =
    storedSelectedVariantId ?? product.variants[0]?.id ?? null;
  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) ?? null;
  const quantity = useBundleCartStore((state) => {
    const selectionKey = getBundleSelectionKey(product.id, selectedVariantId);

    return state.quantitiesBySelectionKey[selectionKey] ?? 0;
  });
  const hasCartSelection = useBundleCartStore((state) =>
    productHasCartSelection(product, state.quantitiesBySelectionKey),
  );
  const savingsPercent = getSavingsPercent(product.price, product.offerPrice);

  return (
    <article
      className={cn(
        'flex h-full min-w-0 flex-col gap-1 rounded-card border bg-surface p-4 shadow-card transition-colors',
        hasCartSelection ? 'border-primary' : 'border-border',
        className,
      )}
    >
      <div className="flex h-full min-w-0 items-stretch gap-4 2xl:flex-col 2xl:items-stretch 2xl:gap-5">
        <div className="flex min-h-0 shrink-0 self-stretch flex-col gap-3 2xl:w-full">
          {savingsPercent ? (
            <p className="w-fit rounded-pill bg-primary px-3 py-1 text-xs font-semibold tracking-[-0.03em] text-text-inverse shadow-sm sm:text-sm">
              Save {savingsPercent}%
            </p>
          ) : null}

          <ProductHero
            key={selectedVariant?.id ?? product.id}
            name={product.name}
            kind={kind}
            variant={selectedVariant}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="space-y-1.5">
            <h3 className="min-w-0 text-xl font-semibold leading-tight text-text sm:text-2xl">
              {product.name}
            </h3>
            <p className="text-sm leading-6 text-text-muted sm:text-base">
              {product.description}{' '}
              <span className="text-primary underline underline-offset-2">
                Learn More
              </span>
            </p>
          </div>

          <SelectVariantControl
            selectedVariantId={selectedVariantId}
            variants={product.variants}
            onSelect={(variantId) => selectVariant(product.id, variantId)}
          />

          <div className="my-auto grid min-w-0 grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <ChangeQuantityControl
              quantity={quantity}
              itemName={product.name}
              onDecrease={() =>
                decrementSelectionQuantity(product.id, selectedVariantId)
              }
              onIncrease={() =>
                incrementSelectionQuantity(product.id, selectedVariantId)
              }
            />

            <ProductPrice
              price={product.price}
              offerPrice={product.offerPrice}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
