import { getBundleSelectionKey } from '@/entities/bundle/model/bundle.selectors';
import type {
  BundlePlan,
  BundleProtection,
} from '@/entities/bundle/model/bundle.types';
import type {
  ProductVisualKind,
  SelectableProduct,
} from '@/entities/product/model/types';

export type CartProductLine = {
  selectionKey: string;
  productId: string;
  variantId: string | null;
  name: string;
  variantLabel: string | null;
  image: string | null;
  kind: ProductVisualKind;
  quantity: number;
  unitPrice: number;
  unitOfferPrice: number | null;
  lineComparePrice: number;
  lineFinalPrice: number;
};

export type CartPlanLine = {
  id: string;
  name: string;
  billingPeriod: string;
  comparePrice: number;
  finalPrice: number;
};

export type CartProtectionLine = {
  id: string;
  name: string;
  term: string;
  comparePrice: number;
  finalPrice: number;
};

export type BundleCartSummary = {
  cameras: CartProductLine[];
  sensors: CartProductLine[];
  plan: CartPlanLine | null;
  protection: CartProtectionLine | null;
  isEmpty: boolean;
  /** Total before any discounts (sum of original prices). */
  compareTotal: number;
  /** Total the customer actually pays (offer prices applied). */
  finalTotal: number;
  /** compareTotal - finalTotal */
  savings: number;
  /** Whole-number percentage saved against the compare total. */
  savingsPercent: number;
  /** finalTotal spread evenly across a 12-month year. */
  monthlyOverYear: number;
};

export type BundleCatalog = {
  cameras: SelectableProduct[];
  sensors: SelectableProduct[];
  plans: BundlePlan[];
  protections: BundleProtection[];
};

export type BundleCartSelectionState = {
  quantitiesBySelectionKey: Record<string, number>;
  selectedPlanId: string | null;
  selectedProtectionId: string | null;
};

function buildProductLines(
  products: SelectableProduct[],
  kind: ProductVisualKind,
  quantitiesBySelectionKey: Record<string, number>,
): CartProductLine[] {
  const lines: CartProductLine[] = [];

  for (const product of products) {
    const variants =
      product.variants.length > 0 ? product.variants : [null];

    for (const variant of variants) {
      const selectionKey = getBundleSelectionKey(product.id, variant?.id);
      const quantity = quantitiesBySelectionKey[selectionKey] ?? 0;

      if (quantity <= 0) {
        continue;
      }

      const unitFinalPrice = product.offerPrice ?? product.price;

      lines.push({
        selectionKey,
        productId: product.id,
        variantId: variant?.id ?? null,
        name: product.name,
        variantLabel: variant?.label ?? null,
        image: variant?.image ?? null,
        kind,
        quantity,
        unitPrice: product.price,
        unitOfferPrice: product.offerPrice,
        lineComparePrice: product.price * quantity,
        lineFinalPrice: unitFinalPrice * quantity,
      });
    }
  }

  return lines;
}

export function buildBundleCart(
  catalog: BundleCatalog,
  state: BundleCartSelectionState,
): BundleCartSummary {
  const cameras = buildProductLines(
    catalog.cameras,
    'camera',
    state.quantitiesBySelectionKey,
  );
  const sensors = buildProductLines(
    catalog.sensors,
    'sensor',
    state.quantitiesBySelectionKey,
  );

  const selectedPlan =
    catalog.plans.find((plan) => plan.id === state.selectedPlanId) ?? null;
  const selectedProtection =
    catalog.protections.find(
      (protection) => protection.id === state.selectedProtectionId,
    ) ?? null;

  const plan: CartPlanLine | null = selectedPlan
    ? {
        id: selectedPlan.id,
        name: selectedPlan.name,
        billingPeriod: selectedPlan.billingPeriod,
        comparePrice: selectedPlan.price,
        finalPrice: selectedPlan.offerPrice ?? selectedPlan.price,
      }
    : null;

  const protection: CartProtectionLine | null = selectedProtection
    ? {
        id: selectedProtection.id,
        name: selectedProtection.name,
        term: selectedProtection.term,
        comparePrice: selectedProtection.price,
        finalPrice: selectedProtection.offerPrice ?? selectedProtection.price,
      }
    : null;

  const lineGroups = [...cameras, ...sensors];

  const compareTotal =
    lineGroups.reduce((total, line) => total + line.lineComparePrice, 0) +
    (plan?.comparePrice ?? 0) +
    (protection?.comparePrice ?? 0);

  const finalTotal =
    lineGroups.reduce((total, line) => total + line.lineFinalPrice, 0) +
    (plan?.finalPrice ?? 0) +
    (protection?.finalPrice ?? 0);

  const savings = Math.max(compareTotal - finalTotal, 0);
  const savingsPercent =
    compareTotal > 0 ? Math.round((savings / compareTotal) * 100) : 0;

  return {
    cameras,
    sensors,
    plan,
    protection,
    isEmpty:
      cameras.length === 0 &&
      sensors.length === 0 &&
      plan === null &&
      protection === null,
    compareTotal,
    finalTotal,
    savings,
    savingsPercent,
    monthlyOverYear: finalTotal / 12,
  };
}
