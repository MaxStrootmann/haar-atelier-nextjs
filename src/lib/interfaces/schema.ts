import type { PortableTextBlock } from "@portabletext/types";

export interface ProductSchema {
  _id: string;
  name: string;
  slug: string;
  description: [PortableTextBlock];
  featured_image: Image;
  price: number;
  op_voorraad: boolean;
  quantity?: number;
  subcategories: [
    {
      title: string;
      slug: string;
    }
  ];
}

export interface CategorySchema {
  _id: string;
  title: string;
  description: string;
  slug: string;
  featured_image: Image;
}

export interface Image {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

export interface ReviewSchema {
  _id: string;
  name: string;
  inhoud: [PortableTextBlock];
  foto: Image;
}
