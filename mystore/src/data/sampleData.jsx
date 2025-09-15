export const sampleCategories = [
  "All",
  "Tech & Gadgets",
  "Home & Kitchen",
  "Fitness",
  "Outdoors",
  "Beauty",
];

export const sampleProducts = Array.from({ length: 12 }).map((_, i) => ({
  id: `p-${i + 1}`,
  title: `Product ${i + 1} — ${
    ["Gadget", "Tool", "Trainer", "Accessory"][i % 4]
  }`,
  category: sampleCategories[1 + (i % (sampleCategories.length - 1))],
  price: (19 + i * 5).toFixed(2),
  rating: 3 + (i % 3) + 0.5 * (i % 2),
  image: `https://picsum.photos/seed/affiliate-${i + 1}/600/400`,
  short: "A concise one-line product summary that highlights the main benefit.",
  pros: ["Good value", "Trusted brand", "Fast shipping"].slice(0, 2 + (i % 2)),
  cons: ["Limited colors", "Not for heavy use"].slice(0, 1 + (i % 2)),
  affiliateUrl: `https://example.com/affiliate?p=${i + 1}`,
}));

export function formatPrice(p) {
  return `$${Number(p).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  })}`;
}
