"use client";
import React, { createContext, ReactNode } from "react";
import API from "_utils/api";

type ApiContextType = {
  api: typeof API;
};

export const APIContext = createContext<ApiContextType | undefined>(undefined);

type ApiProviderProps = {
  children: ReactNode;
};

export const APIProvider = ({ children }: ApiProviderProps) => {
  const api = API;

  return <APIContext.Provider value={{ api }}>{children}</APIContext.Provider>;
};
