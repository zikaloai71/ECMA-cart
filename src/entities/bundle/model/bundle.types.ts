import type { ProductPricing } from '@/entities/product/model/types';

export type BundlePlan = ProductPricing & {
  id: string;
  name: string;
  description: string;
  billingPeriod: string;
  badge: string;
  features: string[];
};

export type BundleProtection = ProductPricing & {
  id: string;
  name: string;
  description: string;
  coverageType: string;
  term: string;
  benefits: string[];
};
