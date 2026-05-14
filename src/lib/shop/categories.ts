export type HardcodedCategory = {
  id: number;
  name: string;
  image: string;
};

export type HardcodedCategories = HardcodedCategory[];

export const hardCodedCategories: HardcodedCategories = [
  {
    id: 1,
    name: "Alle producten",
    image: "/categories/conditioner.png",
  },
  {
    id: 2,
    name: "Shampoo & Conditioners",
    image: "/categories/hairwash.png",
  },
  {
    id: 3,
    name: "Lichaamsverzorging",
    image: "/categories/lichaamsverzorging.png",
  },
  { id: 4, name: "Maskers & Colour Treatments", image: "/categories/mask.png" },
  { id: 5, name: "Versteviging & Styling", image: "/categories/styling.png" },
  {
    id: 6,
    name: "Verzorging & Bescherming",
    image: "/categories/bescherming.png",
  },
  { id: 7, name: "Accessoires", image: "/categories/accessoires.png" },
];
