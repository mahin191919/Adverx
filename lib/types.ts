export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  gallery: string[];
  price: number;
  tags: string[];
  category: string;
  rating: number;
  sales: number;
  trending?: boolean;
};

export type Order = {
  id: string;
  productTitle: string;
  amount: number;
  status: "paid" | "pending" | "refunded";
  createdAt: string;
};
