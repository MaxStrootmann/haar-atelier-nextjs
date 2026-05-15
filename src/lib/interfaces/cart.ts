import type { StorefrontProduct } from "lib/payload/storefront";

export interface CartProduct extends StorefrontProduct {
  quantity?: number;
}

export interface CookieCart {
  slug: string;
  quantity?: number;
}
