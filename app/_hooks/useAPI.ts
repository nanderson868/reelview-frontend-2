import { useContext } from "react";
import { APIContext } from "_contexts/APIContext";

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error("useApi must be used within a ApiProvider");
  }
  return context;
};
