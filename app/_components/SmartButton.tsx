"use client";
import { Button, Spinner, Tooltip } from "flowbite-react";
import React, { useState, useCallback, useMemo } from "react";
import { IconType } from "react-icons";
import { ButtonColor, StatusColor } from "_ui/theme";

interface SmartButtonProps {
  onClick?: () => Promise<void> | void;
  children?: React.ReactNode;
  colorTheme?: ButtonColor;
  size?: "default";
  label?: string;
  Icon?: IconType;
  className?: string;
  disabled?: boolean;
  iconColor?: StatusColor;
  loading?: boolean;
  tooltip?: string;
  type?: "submit" | "button";
}

const SmartButton: React.FC<SmartButtonProps> = ({
  onClick = async () => Promise<void>,
  children,
  colorTheme = "zinc",
  size = "default",
  label,
  Icon,
  className,
  disabled = false,
  iconColor,
  tooltip,
  loading = false,
  type,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        await onClick();
      } catch (error) {
        console.error("Async operation failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [onClick],
  );

  // const iconClass = useMemo(() => {
  //   return iconColor ? `dark:stroke-${iconColor}` : "dark:stroke";
  // }, [iconColor]);

  const iconClass = () => {
    switch (iconColor) {
      case "info":
        return "dark:stroke-info";
      case "success":
        return "dark:stroke-success";
      case "failure":
        return "dark:stroke-failure";
      case "warning":
        return "dark:stroke-warning";
      default:
        return "dark:stroke";
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading || disabled}
      size={size}
      color={colorTheme}
      className={className}
      type={type}
    >
      <Tooltip
        arrow={false}
        content={tooltip}
        trigger="hover"
        placement="left"
        className={`${tooltip ? "" : "hidden"}`}
      >
        <div className="flex flex-row items-center justify-center space-x-1">
          {isLoading || loading ? (
            <Spinner className="flex size-5" aria-label="Loading" />
          ) : (
            Icon && <Icon className={iconClass + " flex"} size={20} />
          )}
          {label && <div className={`flex`}>{label}</div>}
          {children}
        </div>
      </Tooltip>
    </Button>
  );
};

export default SmartButton;
