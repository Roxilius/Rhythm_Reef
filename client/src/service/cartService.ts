import { CartType, GenericResponseType } from "@/types";
import { getToken } from "./userService";

export const addToCart = async (id: string, qty: number): Promise<GenericResponseType<null>> => {
  const token = getToken();
  const response = await fetch("http://localhost:8080/cart/add-cart-items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId: id,
      quantity: qty,
    }),
  });
  return response.json();
};

export const deleteCartItem = async (id: string): Promise<GenericResponseType<null>> => {
  const token = getToken();
  const response = await fetch(`http://localhost:8080/cart/delete-cart-items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  getCart();
  return response.json();
};

export const getCart = async (): Promise<GenericResponseType<CartType | null>> => {
  const token = getToken();
  const result = await fetch("http://localhost:8080/cart/find-all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await result.json();
  return res;
};
