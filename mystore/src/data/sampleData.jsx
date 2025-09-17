export const sampleCategories = [
  "All",
  "Tech & Gadgets",
  "Home & Kitchen",
  "Fitness",
  "Outdoors",
  "Beauty",
];



export function formatPrice(p) {
  return `$${Number(p).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  })}`;
}
