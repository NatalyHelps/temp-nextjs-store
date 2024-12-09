"use server";

import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { productSchema } from "./schemas";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "an error occurred",
  };
};

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
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

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = productSchema.parse(rawData);
    console.log(rawData);

    return { message: "product created" };
  } catch (error) {
    return renderError(error);
  }
};
