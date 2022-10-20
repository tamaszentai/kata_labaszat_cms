export enum pageTitleEnum {
  "dashboard" = 1,
  "about" = 2,
  "services" = 3,
  "gallery" = 4,
  "pricelist" = 5,
  "blog" = 6,
}

export const pageTitleMap = new Map<string, string>([
  ["dashboard", "Információs pult"],
  ["about", "Magamról"],
  ["services", "Szolgáltatások"],
  ["gallery", "Galéria"],
  ["pricelist", "Árlista"],
  ["blog", "Blog"],
]);

export const pageTitleObject = {
  dashboard: "Információs pult",
  about: "Magamról",
  services: "Szolgáltatások",
  gallery: "Galéria",
  pricelist: "Árlista",
  blog: "Blog",
}
