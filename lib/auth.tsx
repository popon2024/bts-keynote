"use client";

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const isLoggedIn = (): boolean => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem("token");
};
