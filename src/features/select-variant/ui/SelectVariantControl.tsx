import { useState } from 'react';

import type { ProductVariant } from '@/entities/product/model/types';
import { cn } from '@/shared/lib/cn';

type SelectVariantControlProps = {
  selectedVariantId: string | null;
  variants: ProductVariant[];
  onSelect: (variantId: string) => void;
};

export function SelectVariantControl({
  selectedVariantId,
  variants,
  onSelect,
}: SelectVariantControlProps) {
  if (variants.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {variants.map((variant) => {
        const isSelected = variant.id === selectedVariantId;

        return (
          <button
            key={variant.id}
            type="button"
            aria-pressed={isSelected}
            className={cn(
              'inline-flex min-h-8 items-center gap-1.5 rounded-sm border px-2 py-1 text-xs font-medium text-text transition-colors outline-none',
              'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
              isSelected
                ? 'border-text'
                : 'border-border bg-surface hover:border-border-strong',
            )}
            onClick={() => onSelect(variant.id)}
          >
            <VariantThumbnail variant={variant} />
            <span className="truncate">{variant.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function VariantThumbnail({ variant }: { variant: ProductVariant }) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div className="flex h-4 w-4 items-center justify-center overflow-hidden rounded-sm bg-surface">
      {!hasImageError ? (
        <img
          src={variant.image}
          alt=""
          className="h-full w-full object-contain"
          loading="lazy"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center rounded-xs bg-surface-muted text-[10px] font-semibold uppercase text-text-soft">
          {variant.label.slice(0, 1)}
        </span>
      )}
    </div>
  );
}
