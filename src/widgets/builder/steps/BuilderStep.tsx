import type { ReactNode } from 'react';

import { useBundleBuilderStore } from '@/entities/bundle/model/bundleBuilder.store';
import { cn } from '@/shared/lib/cn';
import { Accordion } from '@/shared/ui/accordion/Accordion';
import { Button } from '@/shared/ui/button/Button';

const TOTAL_BUILDER_STEPS = 4;

type BuilderStepProps = {
  stepNumber: number;
  title: string;
  icon?: ReactNode;
  nextActionLabel?: string;
  nextStepNumber?: number;
  children: ReactNode;
};

export function BuilderStep({
  stepNumber,
  title,
  icon,
  nextActionLabel,
  nextStepNumber,
  children,
}: BuilderStepProps) {
  const openStep = useBundleBuilderStore((state) => state.openStep);
  const goToStep = useBundleBuilderStore((state) => state.goToStep);
  const toggleStep = useBundleBuilderStore((state) => state.toggleStep);
  const open = openStep === stepNumber;

  return (
    <Accordion
      open={open}
      onOpenChange={() => toggleStep(stepNumber)}
      header={`Step ${stepNumber} of ${TOTAL_BUILDER_STEPS}`}
      title={title}
      icon={icon}
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
