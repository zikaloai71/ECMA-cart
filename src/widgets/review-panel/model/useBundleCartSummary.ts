import { useMemo } from 'react';

import camerasData from '@/data/bundle-cameras.json';
import plansData from '@/data/bundle-plans.json';
import protectionsData from '@/data/bundle-protections.json';
import sensorsData from '@/data/bundle-sensors.json';
import type {
  BundlePlan,
  BundleProtection,
} from '@/entities/bundle/model/bundle.types';
import { useBundleCartStore } from '@/entities/bundle/model/bundleCart.store';
import {
  buildBundleCart,
  type BundleCatalog,
} from '@/entities/bundle/model/cart.summary';
import type { SelectableProduct } from '@/entities/product/model/types';

const catalog: BundleCatalog = {
  cameras: camerasData as SelectableProduct[],
  sensors: sensorsData as SelectableProduct[],
  plans: plansData as BundlePlan[],
  protections: protectionsData as BundleProtection[],
};

export function useBundleCartSummary() {
  const quantitiesBySelectionKey = useBundleCartStore(
    (state) => state.quantitiesBySelectionKey,
  );
  const selectedPlanId = useBundleCartStore((state) => state.selectedPlanId);
  const selectedProtectionId = useBundleCartStore(
    (state) => state.selectedProtectionId,
  );

  return useMemo(
    () =>
      buildBundleCart(catalog, {
        quantitiesBySelectionKey,
        selectedPlanId,
        selectedProtectionId,
      }),
    [quantitiesBySelectionKey, selectedPlanId, selectedProtectionId],
  );
}
