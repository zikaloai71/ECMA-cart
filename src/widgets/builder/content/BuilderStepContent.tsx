import type { PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/cn';

type BuilderStepContentProps = PropsWithChildren<{
  className?: string;
}>;

export function BuilderStepContent({
  children,
  className,
}: BuilderStepContentProps) {
  return (
    <div
      className={cn(
        'rounded-panel',
        className,
      )}
    >
      {children}
    </div>
  );
}
