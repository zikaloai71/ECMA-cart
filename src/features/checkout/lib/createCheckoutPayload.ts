import type { BundleCartSummary } from '@/entities/bundle/model/cart.summary';

export type CheckoutLineItem = {
  productId: string;
  variantId: string | null;
  name: string;
  quantity: number;
  unitPrice: number;
  unitOfferPrice: number | null;
  lineTotal: number;
};

export type CheckoutSubscription = {
  id: string;
  name: string;
  unitPrice: number;
  billingPeriod: string;
};

export type CheckoutPayload = {
  currency: string;
  createdAt: string;
  items: CheckoutLineItem[];
  plan: CheckoutSubscription | null;
  protection: CheckoutSubscription | null;
  totals: {
    subtotal: number;
    discount: number;
    total: number;
    savingsPercent: number;
    estimatedMonthly: number;
  };
};

const CURRENCY = 'USD';

function round(value: number) {
  return Math.round(value * 100) / 100;
}

/**
 * Maps the in-app cart summary into a flat, server-friendly order payload.
 */
export function createCheckoutPayload(
  summary: BundleCartSummary,
): CheckoutPayload {
  const items: CheckoutLineItem[] = [...summary.cameras, ...summary.sensors].map(
    (line) => ({
      productId: line.productId,
      variantId: line.variantId,
      name: line.variantLabel ? `${line.name} (${line.variantLabel})` : line.name,
      quantity: line.quantity,
      unitPrice: line.unitPrice,
      unitOfferPrice: line.unitOfferPrice,
      lineTotal: round(line.lineFinalPrice),
    }),
  );

  return {
    currency: CURRENCY,
    createdAt: new Date().toISOString(),
    items,
    plan: summary.plan
      ? {
          id: summary.plan.id,
          name: summary.plan.name,
          unitPrice: summary.plan.finalPrice,
          billingPeriod: summary.plan.billingPeriod,
        }
      : null,
    protection: summary.protection
      ? {
          id: summary.protection.id,
          name: summary.protection.name,
          unitPrice: summary.protection.finalPrice,
          billingPeriod: summary.protection.term,
        }
      : null,
    totals: {
      subtotal: round(summary.compareTotal),
      discount: round(summary.savings),
      total: round(summary.finalTotal),
      savingsPercent: summary.savingsPercent,
      estimatedMonthly: round(summary.monthlyOverYear),
    },
  };
}
