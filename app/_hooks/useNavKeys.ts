import { useCallback } from "react";

type useKeyBoardNavProps = {
  count: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  onEnter: () => void;
};

const useKeyboardNavigation = ({
  count,
  setIndex,
  onEnter,
}: useKeyBoardNavProps) => {
  return useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          onEnter();
          break;
        case "ArrowDown":
          setIndex((prev) => (prev + 1) % (count + 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setIndex((prev) => (prev === 0 ? count : prev - 1));
          break;
      }
    },
    [count, setIndex, onEnter],
  );
};

export default useKeyboardNavigation;
