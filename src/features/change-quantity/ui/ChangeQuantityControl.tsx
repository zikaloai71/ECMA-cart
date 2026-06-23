import { cn } from '@/shared/lib/cn';

type ChangeQuantityControlProps = {
  quantity: number;
  itemName: string;
  onDecrease: () => void;
  onIncrease: () => void;
};

const baseBtn =
  'flex h-7 w-7 items-center justify-center rounded border border-border text-xl leading-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface';
const enabledBtn = 'bg-surface text-text-soft';
const disabledBtn = 'bg-disabled-bg text-disabled-text cursor-not-allowed';

export function ChangeQuantityControl({
  quantity,
  itemName,
  onDecrease,
  onIncrease,
}: ChangeQuantityControlProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className={cn(baseBtn, quantity === 0 ? disabledBtn : enabledBtn)}
        aria-label={`Decrease quantity of ${itemName}`}
        disabled={quantity === 0}
        onClick={onDecrease}
      >
        <span className="-mt-0.5">-</span>
      </button>

      <span
        className="font-medium tracking-[-0.04em] text-text"
        aria-live="polite"
      >
        {quantity}
      </span>

      <button
        type="button"
        className={cn(baseBtn, enabledBtn)}
        aria-label={`Increase quantity of ${itemName}`}
        onClick={onIncrease}
      >
        <span className="-mt-0.5">+</span>
      </button>
    </div>
  );
}
