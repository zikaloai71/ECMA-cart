export type ProductVariant = {
  id: string;
  label: string;
  image: string;
};

export type ProductPricing = {
  price: number;
  offerPrice: number | null;
};

export type SelectableProduct = ProductPricing & {
  id: string;
  name: string;
  description: string;
  variants: ProductVariant[];
};

export type ProductVisualKind = 'camera' | 'sensor';
