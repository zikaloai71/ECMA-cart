import sensorsData from '@/data/bundle-sensors.json';
import { useBundleCartStore } from '@/entities/bundle/model/bundleCart.store';
import { countSelectedProducts } from '@/entities/bundle/model/bundle.selectors';
import type { SelectableProduct } from '@/entities/product/model/types';
import { BundleProductCard } from '@/widgets/builder/cards/BundleProductCard';
import { BuilderStepContent } from '@/widgets/builder/content/BuilderStepContent';
import { BuilderStep } from '@/widgets/builder/steps/BuilderStep';

const sensors = sensorsData as SelectableProduct[];

export function ChooseSensorsStep() {
  const selectedCount = useBundleCartStore((state) =>
    countSelectedProducts(sensors, state.quantitiesBySelectionKey),
  );

  return (
    <BuilderStep
      stepNumber={3}
      title="Choose your sensors"
      icon={<SensorsIcon />}
      summary={selectedCount > 0 ? `${selectedCount} selected` : undefined}
      nextActionLabel="Next: Add extra protection"
      nextStepNumber={4}
    >
      <BuilderStepContent>
        <div className="grid gap-4 xl:grid-cols-2">
          {sensors.map((sensor) => (
            <BundleProductCard
              key={sensor.id}
              product={sensor}
              kind="sensor"
            />
          ))}
        </div>
      </BuilderStepContent>
    </BuilderStep>
  );
}

function SensorsIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10"
        y="4"
        width="12"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="14" cy="9" r="1.25" fill="currentColor" />
      <circle cx="18" cy="9" r="1.25" fill="currentColor" />
      <path
        d="M6 17C8.2 19.6 11.75 21.25 16 21.25C20.25 21.25 23.8 19.6 26 17"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M4 22C6.95 25.45 11.1 27.5 16 27.5C20.9 27.5 25.05 25.45 28 22"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M12.5 15.5C13.45 16.2 14.65 16.6 16 16.6C17.35 16.6 18.55 16.2 19.5 15.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
