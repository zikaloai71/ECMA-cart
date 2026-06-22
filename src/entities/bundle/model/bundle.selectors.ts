import type { SelectableProduct } from '@/entities/product/model/types';

export function getBundleSelectionKey(
  productId: string,
  variantId?: string | null,
) {
  return variantId ? `${productId}::${variantId}` : productId;
}

export function productHasCartSelection(
  product: Pick<SelectableProduct, 'id' | 'variants'>,
  quantitiesBySelectionKey: Record<string, number>,
) {
  const selectionKeys =
    product.variants.length > 0
      ? product.variants.map((variant) =>
          getBundleSelectionKey(product.id, variant.id),
        )
      : [getBundleSelectionKey(product.id)];

  return selectionKeys.some(
    (selectionKey) => (quantitiesBySelectionKey[selectionKey] ?? 0) > 0,
  );
}

export function countSelectedProducts(
  products: Array<Pick<SelectableProduct, 'id' | 'variants'>>,
  quantitiesBySelectionKey: Record<string, number>,
) {
  return products.reduce((count, product) => {
    return count + Number(productHasCartSelection(product, quantitiesBySelectionKey));
  }, 0);
}
