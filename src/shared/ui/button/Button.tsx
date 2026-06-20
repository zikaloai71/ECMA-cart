import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/cn';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    fullWidth?: boolean;
  }
>;

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    'border-primary bg-primary text-text-inverse hover:bg-primary-hover',
  secondary:
    'border-primary bg-transparent text-primary hover:bg-primary-soft',
};

export function Button({
  children,
  className,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-button border px-5 py-3 text-base font-semibold transition-colors outline-none',
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page',
        'disabled:cursor-not-allowed disabled:border-border disabled:bg-disabled-bg disabled:text-disabled-text',
        fullWidth && 'w-full',
        variantClassNames[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
