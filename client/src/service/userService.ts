import { EditProfileType, GenericResponseType, ProfileType } from "@/types";

export const login = async (email: string, password: string) => {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const res = await response.json();
  return res;
};

export const register = async (
  fullName: string,
  phoneNumber: string,
  email: string,
  password: string
) => {
  const response = await fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    }),
  });
  const res = await response.json();
  return res;
};

export const sendOtp = async (
  email: string
): Promise<GenericResponseType<null>> => {
  const response = await fetch(
    `http://localhost:8080/auth/verify-email/${email}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const res = await response.json();
  return res;
};

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<GenericResponseType<null>> => {
  const response = await fetch(
    `http://localhost:8080/auth/verify-otp/${otp}/${email}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const res = await response.json();
  return res;
};

export const resetPassword = async (
  email: string,
  password: string,
  rePassword: string
): Promise<GenericResponseType<null>> => {
  const response = await fetch(
    `http://localhost:8080/auth/change-password/${email}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        rePassword: rePassword,
      }),
    }
  );
  const res = await response.json();
  return res;
};

export const getProfile = async (): Promise<ProfileType> => {
  const token = getToken();
  const response = await fetch("http://localhost:8080/auth/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await response.json();
  return res.data as ProfileType;
};

export const updateProfile = async (edit: Partial<EditProfileType>): Promise<GenericResponseType<null>> => {
  const token = getToken();
  console.log(
    JSON.stringify({
      email: edit.email,
      fullName: edit.fullName,
      dateOfBirth: edit.dateOfBirth? new Date(edit.dateOfBirth).toISOString().split("T")[0] : null,
      address: edit.address? edit.address : null,
      phoneNumber: edit.phoneNumber,
      gender: edit.gender,
    })
  );
  const response = await fetch("http://localhost:8080/auth/edit-profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: edit.email,
      fullName: edit.fullName,
      dateOfBirth: edit.dateOfBirth? new Date(edit.dateOfBirth).toISOString().split("T")[0] : null,
      address: edit.address? edit.address : null,
      phoneNumber: edit.phoneNumber,
      gender: edit.gender,
    }),
  });
  const res = await response.json();
  return res;
};

export const uploadImage = async (
  file: File
): Promise<GenericResponseType<ProfileType>> => {
  const token = getToken();
  const formData = new FormData();
  formData.append("userImage", file);
  const response = await fetch("http://localhost:8080/upload-user-image", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const res = await response.json();
  return res;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
export const getRole = () => {
  return localStorage.getItem("role");
};
