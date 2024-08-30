export function appendBaseUrlToImages<T extends { image: string }>(
  items: T[],
): T[] {
  const baseUrl = process.env.BASE_URL || '';
  return items.map((item) => {
    if (item.image) {
      item.image = `${baseUrl}/${item.image}`;
    }
    return item;
  });
}

export function appendBaseUrlToLogo<T extends { logo: string }>(
  items: T[],
): T[] {
  const baseUrl = process.env.BASE_URL || '';
  return items.map((item) => {
    if (item.logo) {
      item.logo = `${baseUrl}/${item.logo}`;
    }
    return item;
  });
}
