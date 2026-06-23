import type { PropsWithChildren } from 'react';

type ReviewSectionProps = PropsWithChildren<{
  title: string;
  /** Renders the section only when it has content. */
  hidden?: boolean;
}>;

export function ReviewSection({
  title,
  hidden = false,
  children,
}: ReviewSectionProps) {
  if (hidden) {
    return null;
  }

  return (
    <section className="border-t border-border pt-5 first:border-t-0 first:pt-0">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-label">
        {title}
      </h3>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}
