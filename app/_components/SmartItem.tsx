"use client";
import { useAPI } from "_hooks/useAPI";
import { QueryItem } from "_utils/types";
import {
  HiOutlineUser,
  HiOutlineSearch,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";

interface SmartItemProps {
  item: QueryItem;
  index?: number;
  onClick?: (e: React.MouseEvent) => void;
  isActive?: boolean;
  disabled?: boolean;
}

const SmartItem: React.FC<SmartItemProps> = ({
  item,
  index,
  onClick,
  isActive,
  disabled,
}) => {
  const { api } = useAPI();

  const getIconComponent = (item: QueryItem): JSX.Element => {
    return <HiOutlineQuestionMarkCircle />;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // const displayName = typeof item == "string" ? item : "";

  const data = api.getUser(item);

  return (
    <li
      key={index}
      className={`search-suggestion ${isActive ? "bg-secondary" : ""}`}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        if (!disabled && onClick) onClick(e);
      }}
    >
      {getIconComponent(item)} <span className="flex-1">{displayName}</span>
    </li>
  );
};

export default SmartItem;
