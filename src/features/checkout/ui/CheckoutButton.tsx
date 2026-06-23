import type { BundleCartSummary } from '@/entities/bundle/model/cart.summary';
import { createCheckoutPayload } from '@/features/checkout/lib/createCheckoutPayload';
import { Button } from '@/shared/ui/button/Button';

type CheckoutButtonProps = {
  summary: BundleCartSummary;
};

export function CheckoutButton({ summary }: CheckoutButtonProps) {
  function handleCheckout() {
    const payload = createCheckoutPayload(summary);

    // Format the cart into the server-ready order payload and surface it.
    console.log('[checkout] order payload', payload);
    console.log('[checkout] order payload (json)', JSON.stringify(payload, null, 2));
  }

  return (
    <Button
      fullWidth
      className="min-h-14 text-lg"
      disabled={summary.isEmpty}
      onClick={handleCheckout}
    >
      Checkout
    </Button>
  );
}
