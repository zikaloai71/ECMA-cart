import protectionsData from '@/data/bundle-protections.json';
import type { BundleProtection } from '@/entities/bundle/model/bundle.types';
import { BundleProtectionCard } from '@/widgets/builder/cards/BundleProtectionCard';
import { BuilderStepContent } from '@/widgets/builder/content/BuilderStepContent';
import { BuilderStep } from '@/widgets/builder/steps/BuilderStep';

export function AddExtraProtectionStep() {
  const protections = protectionsData as BundleProtection[];

  return (
    <BuilderStep
      stepNumber={4}
      title="Add extra protection"
      icon={<ProtectionIcon />}
    >
      <BuilderStepContent>
        <div className="grid gap-4 lg:grid-cols-3">
          {protections.map((protection) => (
            <BundleProtectionCard key={protection.id} protection={protection} />
          ))}
        </div>
      </BuilderStepContent>
    </BuilderStep>
  );
}

function ProtectionIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 4L23 9V18C23 22.35 20 26.15 16 27.25C12 26.15 9 22.35 9 18V9L16 4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="13" r="1.5" fill="currentColor" />
      <circle cx="11" cy="19.5" r="1.5" fill="currentColor" />
      <circle cx="21" cy="19.5" r="1.5" fill="currentColor" />
      <path
        d="M16 14.5V18M14.7 14.75L12.3 18.1M17.3 14.75L19.7 18.1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
