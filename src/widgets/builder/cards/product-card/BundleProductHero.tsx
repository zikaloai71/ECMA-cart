import { useState } from 'react';

import type { BundleVariant } from '@/entities/bundle/model/bundle.types';

type BundleProductHeroProps = {
  name: string;
  kind: 'camera' | 'sensor';
  variant: BundleVariant | null;
};

export function BundleProductHero({
  name,
  kind,
  variant,
}: BundleProductHeroProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const imageSrc = variant?.image ?? null;

  return (
    <div className="flex min-h-36 w-28 flex-1 items-center justify-center rounded-2xl bg-page/60 p-3 sm:min-h-40 sm:w-32 2xl:min-h-44 2xl:w-full 2xl:p-4">
      {imageSrc && !hasImageError ? (
        <img
          src={imageSrc}
          alt={variant?.label ? `${name} in ${variant.label}` : name}
          className="h-full w-auto max-w-full object-contain"
          loading="lazy"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-primary">
          <div className="scale-75 sm:scale-90 2xl:scale-100">
            {kind === 'camera' ? <CameraGlyph /> : <SensorGlyph />}
          </div>
        </div>
      )}
    </div>
  );
}

function CameraGlyph() {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="26"
        y="16"
        width="44"
        height="44"
        rx="14"
        fill="currentColor"
        fillOpacity="0.14"
      />
      <circle cx="48" cy="38" r="17" stroke="currentColor" strokeWidth="4" />
      <circle cx="48" cy="38" r="7" fill="currentColor" />
      <path
        d="M40 61L33 75H63L56 61"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SensorGlyph() {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="32"
        y="18"
        width="32"
        height="24"
        rx="8"
        stroke="currentColor"
        strokeWidth="4"
      />
      <circle cx="43" cy="30" r="3.5" fill="currentColor" />
      <circle cx="53" cy="30" r="3.5" fill="currentColor" />
      <path
        d="M18 56C24.5 63.5 35.25 68 48 68C60.75 68 71.5 63.5 78 56"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M12 70C20.75 80 32.5 85 48 85C63.5 85 75.25 80 84 70"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M28 41C32 45.5 39 48 48 48C57 48 64 45.5 68 41"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
