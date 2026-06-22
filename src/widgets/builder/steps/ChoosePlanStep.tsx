import plansData from '@/data/bundle-plans.json';
import type { BundlePlan } from '@/entities/bundle/model/bundle.types';
import { BundlePlanCard } from '@/widgets/builder/cards/BundlePlanCard';
import { BuilderStepContent } from '@/widgets/builder/content/BuilderStepContent';
import { BuilderStep } from '@/widgets/builder/steps/BuilderStep';

export function ChoosePlanStep() {
  const plans = plansData as BundlePlan[];

  return (
    <BuilderStep
      stepNumber={2}
      title="Choose your plan"
      icon={<PlanShieldIcon />}
      nextActionLabel="Next: Choose your sensors"
      nextStepNumber={3}
    >
      <BuilderStepContent>
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <BundlePlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </BuilderStepContent>
    </BuilderStep>
  );
}

function PlanShieldIcon() {
  return (
    <svg
      width="28"
      height="32"
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2L25 6V15C25 22.1 20.4 28.25 14 30C7.6 28.25 3 22.1 3 15V6L14 2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}
