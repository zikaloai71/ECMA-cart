export type BundleVariant = {
  id: string;
  label: string;
  image: string;
};

export type BundleSelectableProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number | null;
  variants: BundleVariant[];
};

export type BundlePlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: string;
  offerPrice: number | null;
  badge: string;
  features: string[];
};

export type BundleProtection = {
  id: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number | null;
  coverageType: string;
  term: string;
  benefits: string[];
};
