import { BuilderStep } from '@/widgets/builder/steps/BuilderStep';

export function ChooseCamerasStep() {
  return (
    <BuilderStep
      stepNumber={1}
      title="Choose your cameras"
      icon={<CameraIcon />}
      nextActionLabel="Next: Choose your plan"
      nextStepNumber={2}
    >
      <div className="rounded-lg bg-surface-muted p-4 text-sm text-text-muted">
        Camera selection content will live here.
      </div>
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
