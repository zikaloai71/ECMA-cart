import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useId,
  useState,
} from 'react';

import { cn } from '@/shared/lib/cn';

type AccordionHeadingLevel = 2 | 3 | 4 | 5 | 6;

type AccordionProps = {
  title: ReactNode;
  children: ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  headingLevel?: AccordionHeadingLevel;
  className?: string;
  headerClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
} & Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'title'>;

export function Accordion({
  title,
  children,
  header,
  icon,
  open,
  defaultOpen = false,
  disabled = false,
  onOpenChange,
  headingLevel = 2,
  className,
  headerClassName,
  triggerClassName,
  contentClassName,
  id,
  ...props
}: AccordionProps) {
  const generatedId = useId().replace(/:/g, '');
  const baseId = id ?? `accordion-${generatedId}`;
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const HeadingTag = `h${headingLevel}` as ElementType;

  function handleToggle() {
    if (disabled) {
      return;
    }

    const nextOpen = !isOpen;

    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  return (
    <section
      className={cn('border-b border-border', className)}
      data-state={isOpen ? 'open' : 'closed'}
      {...props}
    >
      {header ? (
        <div
          className={cn(
            'border-b border-border px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] text-text-muted sm:px-6',
            headerClassName,
          )}
        >
          {header}
        </div>
      ) : null}

      <HeadingTag className="m-0">
        <button
          id={triggerId}
          type="button"
          className={cn(
            'flex w-full items-center justify-between gap-4 px-4 py-5 text-left text-text transition-colors outline-none sm:px-6 sm:py-6',
            'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page',
            'disabled:cursor-not-allowed disabled:text-disabled-text',
            triggerClassName,
          )}
          aria-controls={panelId}
          aria-expanded={isOpen}
          disabled={disabled}
          onClick={handleToggle}
        >
          <span className="flex min-w-0 items-center gap-4">
            {icon ? (
              <span
                className="shrink-0 text-text-soft"
                aria-hidden="true"
              >
                {icon}
              </span>
            ) : null}

            <span className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">
              {title}
            </span>
          </span>

          <span
            className={cn(
              'shrink-0 text-primary transition-transform duration-200',
              isOpen ? 'rotate-180' : 'rotate-0',
            )}
            aria-hidden="true"
          >
            <AccordionChevronIcon />
          </span>
        </button>
      </HeadingTag>

      <div
        id={panelId}
        className={cn('px-4 pb-5 sm:px-6 sm:pb-6', contentClassName)}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
      >
        {children}
      </div>
    </section>
  );
}

function AccordionChevronIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 8L10 13L15 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
