import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

type BundleBuilderLayoutProps = {
  leftSection: ReactNode;
  rightSection: ReactNode;
  className?: string;
  leftSectionClassName?: string;
  rightSectionClassName?: string;
};

export function BundleBuilderLayout({
  leftSection,
  rightSection,
  className,
  leftSectionClassName,
  rightSectionClassName,
}: BundleBuilderLayoutProps) {
  return (
    <div
      className={cn(
        'mt-6 grid grid-cols-1 gap-6 md:mt-8 md:gap-8 lg:grid-cols-3 lg:items-start',
        className,
      )}
    >
      <div className={cn('lg:col-span-2', leftSectionClassName)}>
        {leftSection}
      </div>

      <div className={cn('lg:col-span-1', rightSectionClassName)}>
        {rightSection}
      </div>
    </div>
  );
}
