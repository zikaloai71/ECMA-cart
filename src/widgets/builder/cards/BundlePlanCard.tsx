import { useState } from 'react';

import type { BundlePlan } from '@/entities/bundle/model/bundle.types';
import { cn } from '@/shared/lib/cn';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { Button } from '@/shared/ui/button/Button';

type BundlePlanCardProps = {
  plan: BundlePlan;
  className?: string;
};

export function BundlePlanCard({ plan, className }: BundlePlanCardProps) {
  const [selected, setSelected] = useState(false);

  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-card bg-surface p-5 shadow-card transition-colors',
        selected && 'ring-2 ring-primary',
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-text">{plan.name}</h3>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            {plan.badge}
          </p>
        </div>

        <div className="text-right">
          {plan.offerPrice ? (
            <p className="text-sm text-danger line-through">
              {formatCurrency(plan.price)}
            </p>
          ) : null}
          <p className="text-2xl font-bold text-text">
            {formatCurrency(plan.offerPrice ?? plan.price)}
          </p>
          <p className="text-sm text-text-muted">/ {plan.billingPeriod}</p>
        </div>
      </div>

      <p className="text-sm leading-6 text-text-muted">{plan.description}</p>

      <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm text-text">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <Button
          variant={selected ? 'primary' : 'secondary'}
          fullWidth
          onClick={() => setSelected((current) => !current)}
        >
          {selected ? 'Selected' : 'Choose plan'}
        </Button>
      </div>
    </article>
  );
}
