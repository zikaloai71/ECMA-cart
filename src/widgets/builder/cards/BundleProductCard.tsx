import { useState } from 'react';

import type { BundleSelectableProduct } from '@/entities/bundle/model/bundle.types';
import { cn } from '@/shared/lib/cn';
import { BundleProductHero } from '@/widgets/builder/cards/product-card/BundleProductHero';
import { BundleProductPriceBlock } from '@/widgets/builder/cards/product-card/BundleProductPriceBlock';
import { BundleProductQuantityControl } from '@/widgets/builder/cards/product-card/BundleProductQuantityControl';
import { BundleProductVariantSelector } from '@/widgets/builder/cards/product-card/BundleProductVariantSelector';

type BundleProductCardProps = {
  product: BundleSelectableProduct;
  kind: 'camera' | 'sensor';
  className?: string;
};

export function BundleProductCard({
  product,
  kind,
  className,
}: BundleProductCardProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product.variants[0]?.id ?? null,
  );
  const [quantity, setQuantity] = useState(0);
  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) ?? null;
  const savingsPercent = getSavingsPercent(product.price, product.offerPrice);

  return (
    <article
      className={cn(
        'flex h-full min-w-0 flex-col gap-1 rounded-card bg-surface p-4 shadow-card',
        className,
      )}
    >
      <div className="flex h-full min-w-0 items-stretch gap-4 2xl:flex-col 2xl:items-stretch 2xl:gap-5">
        <div className="flex min-h-0 shrink-0 self-stretch flex-col gap-3 2xl:w-full">
          {savingsPercent ? (
            <p className="w-fit rounded-pill bg-[#4c37d9] px-3 py-1 text-xs font-semibold tracking-[-0.03em] text-white shadow-sm sm:text-sm">
              Save {savingsPercent}%
            </p>
          ) : null}

          <BundleProductHero
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
              <span className="text-[#1727ff] underline underline-offset-2">
                Learn More
              </span>
            </p>
          </div>

          <BundleProductVariantSelector
            selectedVariantId={selectedVariantId}
            variants={product.variants}
            onSelect={setSelectedVariantId}
          />

          <div className="my-auto grid min-w-0 grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <BundleProductQuantityControl
              quantity={quantity}
              itemName={product.name}
              onDecrease={() => setQuantity((current) => Math.max(0, current - 1))}
              onIncrease={() => setQuantity((current) => current + 1)}
            />

            <BundleProductPriceBlock
              price={product.price}
              offerPrice={product.offerPrice}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function getSavingsPercent(price: number, offerPrice: number | null) {
  if (!offerPrice || offerPrice >= price) {
    return null;
  }

  return Math.round(((price - offerPrice) / price) * 100);
}
