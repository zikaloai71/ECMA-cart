import type { BundleCartSummary } from '@/entities/bundle/model/cart.summary';

export type CheckoutPayload = {
  items: Array<{
    productId: string;
    variantId: string | null;
    quantity: number;
    lineTotal: number;
  }>;
  planId: string | null;
  protectionId: string | null;
  total: number;
};

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function createCheckoutPayload(summary: BundleCartSummary): CheckoutPayload {
  return {
    items: [...summary.cameras, ...summary.sensors].map((line) => ({
      productId: line.productId,
      variantId: line.variantId,
      quantity: line.quantity,
      lineTotal: round(line.lineFinalPrice),
    })),
    planId: summary.plan?.id ?? null,
    protectionId: summary.protection?.id ?? null,
    total: round(summary.finalTotal),
  };
}
