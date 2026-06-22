import { cn } from '@/shared/lib/cn';

type ChangeQuantityControlProps = {
  quantity: number;
  itemName: string;
  onDecrease: () => void;
  onIncrease: () => void;
};

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
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded border border-[#dfe6ef] bg-white text-xl leading-none text-[#8c96a3] transition-colors outline-none',
          'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
          quantity === 0 && 'opacity-75',
        )}
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
        className="flex h-7 w-7 items-center justify-center rounded bg-[#eef1f5] text-xl leading-none text-[#545c67] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        aria-label={`Increase quantity of ${itemName}`}
        onClick={onIncrease}
      >
        <span className="-mt-0.5">+</span>
      </button>
    </div>
  );
}
