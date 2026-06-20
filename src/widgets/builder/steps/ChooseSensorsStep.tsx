import { BuilderStep } from '@/widgets/builder/steps/BuilderStep';

export function ChooseSensorsStep() {
  return (
    <BuilderStep
      stepNumber={3}
      title="Choose your sensors"
      icon={<SensorsIcon />}
      nextActionLabel="Next: Add extra protection"
      nextStepNumber={4}
    >
      <div className="rounded-lg bg-surface-muted p-4 text-sm text-text-muted">
        Sensor selection content will live here.
      </div>
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
