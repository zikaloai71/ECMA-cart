import { useState } from 'react';

import type { ProductVisualKind } from '@/entities/product/model/types';

type ReviewThumbnailProps = {
  name: string;
  image: string | null;
  kind: ProductVisualKind;
};

export function ReviewThumbnail({ name, image, kind }: ReviewThumbnailProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-muted">
      {image && !hasImageError ? (
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain p-1"
          loading="lazy"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <span
          className="text-xs font-semibold uppercase text-text-soft"
          aria-hidden="true"
        >
          {kind === 'camera' ? 'CAM' : 'SNS'}
        </span>
      )}
    </div>
  );
}
