import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTenantURL(tenantSlug: string) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isSubdomainRoutingEnabled =
    process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING === "true";

  // In development or subddomain routing disabled mode, use normal routing
  if (isDevelopment || !isSubdomainRoutingEnabled) {
    return `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenantSlug}`;
  }

  const protocol = "https";
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!;

  // In production mode, use subdomain routing
  return `${protocol}://${tenantSlug}.${domain}`; // e.g. http://john.localhost:3000/products/683c76029158f0ed64faf2cb
}

export function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value));
}
