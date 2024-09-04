import { ProductType, ProductsType, TermsType } from "@/types";

export const getAllProducts = async (
  terms: TermsType
): Promise<ProductsType> => {
  const response = await fetch(
    `http://localhost:8080/products/get-all-products?page=${terms.page}&name=${terms.name}&category=${terms.category}&sortBy=${terms.sortBy}&sortOrder=${terms.sortOrder}&minPrice=${terms.minPrice}&maxPrice=${terms.maxPrice}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const res = await response.json();
  return res.data.items as ProductsType;
};

export const getProduct = async (id: string | null): Promise<ProductType> => {
  const response = await fetch(
    `http://localhost:8080/products/get-product/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const res = await response.json();
  return res.data as ProductType;
};

export const getProductsPage = async (): Promise<number> => {
  const response = await fetch(
    `http://localhost:8080/products/get-products-page`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const res = await response.json();
  return res.data;
};