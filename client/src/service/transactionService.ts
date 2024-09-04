import { getToken } from "./userService";

export const topUp = async (amount: number) => {
  const token = getToken();
  const response = await fetch(
    `http://localhost:8080/transaction/topup?amount=${amount}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const res = await response.json();
  console.log(res.message)
};
