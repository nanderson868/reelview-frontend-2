// hooks/useEscapeKeyListener.ts
import { useEffect } from "react";

const useEscapeKeyListener = () => {
  useEffect(() => {
    const handleDocumentKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const inputElement = document.activeElement as HTMLElement;
        if (inputElement instanceof HTMLInputElement) {
          inputElement.blur();
        }
      }
    };

    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, []);
};

export default useEscapeKeyListener;
