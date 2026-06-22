import { formatCurrency } from '@/shared/lib/formatCurrency';

type BundleProductPriceBlockProps = {
  price: number;
  offerPrice: number | null;
};

export function BundleProductPriceBlock({
  price,
  offerPrice,
}: BundleProductPriceBlockProps) {
  return (
    <div className="min-w-0 text-right">
      {offerPrice ? (
        <>
          <p className="text-lg leading-none text-[#d13e2f] line-through">
            {formatCurrency(price)}
          </p>
          <p className="mt-1 text-lg font-normal leading-none text-text-muted">
            {formatCurrency(offerPrice)}
          </p>
        </>
      ) : (
        <p className="truncate text-lg font-normal leading-none text-text-muted">
          {formatCurrency(price)}
        </p>
      )}
    </div>
  );
}
