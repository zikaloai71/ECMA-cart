import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/cn';

type PageWrapperProps = PropsWithChildren<
  ComponentPropsWithoutRef<'main'> & {
    className?: string;
  }
>;

export function PageWrapper({
  children,
  className,
  ...props
}: PageWrapperProps) {
  return (
    <main
      className={cn(
        'px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12',
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
}
