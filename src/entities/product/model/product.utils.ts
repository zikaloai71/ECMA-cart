export function getSavingsPercent(price: number, offerPrice: number | null) {
  if (!offerPrice || offerPrice >= price) {
    return null;
  }

  return Math.round(((price - offerPrice) / price) * 100);
}
