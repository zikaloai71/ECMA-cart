import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';
import { Accordion } from '@/shared/ui/accordion/Accordion';
import { Button } from '@/shared/ui/button/Button';
import { useBuilderStepStore } from '@/widgets/builder/model/builderStep.store';

const TOTAL_BUILDER_STEPS = 4;

type BuilderStepProps = {
  stepNumber: number;
  title: string;
  icon?: ReactNode;
  summary?: ReactNode;
  nextActionLabel?: string;
  nextStepNumber?: number;
  children: ReactNode;
};

export function BuilderStep({
  stepNumber,
  title,
  icon,
  summary,
  nextActionLabel,
  nextStepNumber,
  children,
}: BuilderStepProps) {
  const openStep = useBuilderStepStore((state) => state.openStep);
  const goToStep = useBuilderStepStore((state) => state.goToStep);
  const toggleStep = useBuilderStepStore((state) => state.toggleStep);
  const open = openStep === stepNumber;

  return (
    <Accordion
      open={open}
      onOpenChange={() => toggleStep(stepNumber)}
      header={`Step ${stepNumber} of ${TOTAL_BUILDER_STEPS}`}
      title={title}
      icon={icon}
      trailingContent={summary}
      className={cn(
        'overflow-hidden transition-colors duration-200',
        open ? 'bg-selected-bg rounded-card shadow-card' : '',
      )}
    >
      <div className="space-y-5">
        {children}

        {nextActionLabel && nextStepNumber ? (
          <div className="flex justify-center">
            <Button
              variant="secondary"
              onClick={() => goToStep(nextStepNumber)}
            >
              {nextActionLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </Accordion>
  );
}
