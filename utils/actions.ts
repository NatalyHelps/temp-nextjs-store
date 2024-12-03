import db from "@/utils/db";
import { redirect } from "next/navigation";

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
    select: {
      name: true,
      id: true,
      price: true,
      image: true,
    },
  });
  return products;
};

// // This code defines a function fetchAllProducts that queries a database for products based on a search term.
// It uses db.product.findMany() to find products in
//  the database with a name or company matching the search term (case-insensitive). It also orders
//  the results by the createdAt field in descending order. The search term is optional, with a default
//  value of an empty string, ensuring the function works even if no search term is provided.
//  In short, it fetches products based on the search criteria.

export const fetchAllProducts = ({ search = "" }: { search: string }) => {
  return db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/products");
  return product;
};
