import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getBundleSelectionKey } from '@/entities/bundle/model/bundle.selectors';

const BUNDLE_CART_STORAGE_KEY = 'bundle-cart-store';

export type BundleCartState = {
  saveSystemForLaterEnabled: boolean;
  selectedVariantIdsByProductId: Record<string, string | null>;
  quantitiesBySelectionKey: Record<string, number>;
  selectedPlanId: string | null;
  selectedProtectionId: string | null;
  saveSystemForLater: () => void;
  disableSaveSystemForLater: () => void;
  selectVariant: (productId: string, variantId: string) => void;
  incrementSelectionQuantity: (
    productId: string,
    variantId?: string | null,
  ) => void;
  decrementSelectionQuantity: (
    productId: string,
    variantId?: string | null,
  ) => void;
  togglePlanSelection: (planId: string) => void;
  toggleProtectionSelection: (protectionId: string) => void;
  removeSelection: (productId: string, variantId?: string | null) => void;
  removePlan: () => void;
  removeProtection: () => void;
  clearCart: () => void;
  clearSavedSystem: () => void;
};

const EMPTY_CART_STATE = {
  selectedVariantIdsByProductId: {},
  quantitiesBySelectionKey: {},
  selectedPlanId: null,
  selectedProtectionId: null,
} satisfies Partial<BundleCartState>;

export const useBundleCartStore = create<BundleCartState>()(
  persist(
    (set) => ({
      saveSystemForLaterEnabled: false,
      selectedVariantIdsByProductId: {},
      quantitiesBySelectionKey: {},
      selectedPlanId: null,
      selectedProtectionId: null,
      saveSystemForLater: () => {
        set({ saveSystemForLaterEnabled: true });
      },
      disableSaveSystemForLater: () => {
        set({ saveSystemForLaterEnabled: false });
      },
      selectVariant: (productId, variantId) => {
        set((state) => ({
          selectedVariantIdsByProductId: {
            ...state.selectedVariantIdsByProductId,
            [productId]: variantId,
          },
        }));
      },
      incrementSelectionQuantity: (productId, variantId) => {
        const selectionKey = getBundleSelectionKey(productId, variantId);

        set((state) => ({
          quantitiesBySelectionKey: {
            ...state.quantitiesBySelectionKey,
            [selectionKey]:
              (state.quantitiesBySelectionKey[selectionKey] ?? 0) + 1,
          },
        }));
      },
      decrementSelectionQuantity: (productId, variantId) => {
        const selectionKey = getBundleSelectionKey(productId, variantId);

        set((state) => {
          const currentQuantity =
            state.quantitiesBySelectionKey[selectionKey] ?? 0;

          if (currentQuantity <= 1) {
            const restSelections = { ...state.quantitiesBySelectionKey };
            delete restSelections[selectionKey];

            return {
              quantitiesBySelectionKey: restSelections,
            };
          }

          return {
            quantitiesBySelectionKey: {
              ...state.quantitiesBySelectionKey,
              [selectionKey]: currentQuantity - 1,
            },
          };
        });
      },
      togglePlanSelection: (planId) => {
        set((state) => ({
          selectedPlanId: state.selectedPlanId === planId ? null : planId,
        }));
      },
      toggleProtectionSelection: (protectionId) => {
        set((state) => ({
          selectedProtectionId:
            state.selectedProtectionId === protectionId ? null : protectionId,
        }));
      },
      removeSelection: (productId, variantId) => {
        const selectionKey = getBundleSelectionKey(productId, variantId);

        set((state) => {
          if (!(selectionKey in state.quantitiesBySelectionKey)) {
            return state;
          }

          const restSelections = { ...state.quantitiesBySelectionKey };
          delete restSelections[selectionKey];

          return { quantitiesBySelectionKey: restSelections };
        });
      },
      removePlan: () => {
        set({ selectedPlanId: null });
      },
      removeProtection: () => {
        set({ selectedProtectionId: null });
      },
      clearCart: () => {
        set({ ...EMPTY_CART_STATE });
      },
      clearSavedSystem: () => {
        set({ saveSystemForLaterEnabled: false, ...EMPTY_CART_STATE });
        void useBundleCartStore.persist.clearStorage();
      },
    }),
    {
      name: BUNDLE_CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        if (!state.saveSystemForLaterEnabled) {
          return {
            saveSystemForLaterEnabled: false,
          };
        }

        return {
          saveSystemForLaterEnabled: state.saveSystemForLaterEnabled,
          selectedVariantIdsByProductId: state.selectedVariantIdsByProductId,
          quantitiesBySelectionKey: state.quantitiesBySelectionKey,
          selectedPlanId: state.selectedPlanId,
          selectedProtectionId: state.selectedProtectionId,
        };
      },
    },
  ),
);
