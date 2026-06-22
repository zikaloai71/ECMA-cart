import camerasData from '@/data/bundle-cameras.json';
import { useBundleCartStore } from '@/entities/bundle/model/bundleCart.store';
import { countSelectedProducts } from '@/entities/bundle/model/bundle.selectors';
import type { SelectableProduct } from '@/entities/product/model/types';
import { BundleProductCard } from '@/widgets/builder/cards/BundleProductCard';
import { BuilderStepContent } from '@/widgets/builder/content/BuilderStepContent';
import { BuilderStep } from '@/widgets/builder/steps/BuilderStep';

const cameras = camerasData as SelectableProduct[];

export function ChooseCamerasStep() {
  const selectedCount = useBundleCartStore((state) =>
    countSelectedProducts(cameras, state.quantitiesBySelectionKey),
  );

  return (
    <BuilderStep
      stepNumber={1}
      title="Choose your cameras"
      icon={<CameraIcon />}
      summary={selectedCount > 0 ? `${selectedCount} selected` : undefined}
      nextActionLabel="Next: Choose your plan"
      nextStepNumber={2}
    >
      <BuilderStepContent className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {cameras.map((camera) => (
          <BundleProductCard
            key={camera.id}
            product={camera}
            kind="camera"
          />
        ))}
      </BuilderStepContent>
    </BuilderStep>
  );
}

function CameraIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="4"
        width="22"
        height="24"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle
        cx="16"
        cy="13"
        r="5.25"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="16" cy="13" r="1.75" fill="currentColor" />
      <path
        d="M11 28H21"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
