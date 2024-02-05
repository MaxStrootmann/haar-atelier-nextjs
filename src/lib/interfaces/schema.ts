import { PortableTextBlock } from "@portabletext/types";

export interface ProductSchema {
  _id: string;
  name: string;
  slug: any;
  description: [PortableTextBlock];
  featured_image: Image;
  price: number;
  in_stock: boolean;
  quantity?: number;
  popularity: number;
  subcategories: [
    {
      title: string;
      slug: string;
    }
  ];
}

export interface CategorySchema {
  category: string;
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
