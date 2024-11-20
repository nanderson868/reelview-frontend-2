import { type CustomFlowbiteTheme, theme } from "flowbite-react";
import { pallete } from "./pallete";

export type PrimaryColor = keyof typeof pallete;

export const statusColor = {
  default: "zinc",
  info: "blue",
  success: "emerald",
  failure: "red",
  warning: "yellow",
};

export type StatusColor = keyof typeof statusColor;

type ButtonColorTheme = {
  [K in PrimaryColor]: string;
} & {
  minimal: string;
  none: string;
};

const buttonColorTheme: ButtonColorTheme = {
  zinc: "button-color-zinc",
  none: "button-color-none",
  minimal: "button-color-minimal",
  blue: "button-color-blue",
  emerald: "button-color-emerald",
  red: "button-color-red",
  yellow: "button-color-yellow",
};

export type ButtonColor = keyof typeof buttonColorTheme;

export const customTheme: CustomFlowbiteTheme = {
  button: {
    base: "group button-base",
    color: buttonColorTheme,
    size: {
      default: "px-2 py-2 text-sm",
    },
    inner: {
      base: "flex flex-row transition-all duration-200 px-0 mx-0 space-x-1",
    },
  },
  textInput: {
    base: `${theme.textInput.base} w-full`,
    field: {
      base: `${theme.textInput.field.base}`,
      input: {
        colors: {
          default: "dark:bg-transparent border dark:border",
          search: "text-input-search",
        },
        withAddon: {
          off: "pl-12 rounded-lg",
        },
      },
    },
  },
  tooltip: {
    style: {
      dark: "dark:bg-secondary dark:text-primary",
    },
    content: `${theme.tooltip.content} text-nowrap`,
  },
  table: {
    root: {
      base: `table-root-base`,
      wrapper: `table-root-wrapper`,
      shadow: `table-root-shadow `,
    },
    head: {
      base: "group/head table-head-base",
      cell: {
        base: "table-head-cell-base",
      },
    },
    body: {
      base: `group/body table-body-base`,
      cell: {
        base: `table-body-cell-base`,
      },
    },
    row: {
      base: "group/row table-row-base",
    },
  },
  spinner: {
    base: "spinner-base",
  },
  checkbox: {
    root: {
      base: `checkbox-root-base`,
      color: {
        default: "checkbox-root-color-default",
      },
    },
  },
  navbar: {
    root: {
      base: "navbar-root-base",
    },
  },
  footer: {
    root: {
      base: "w-full rounded-lg bg-white shadow dark:bg-gray-800 md:flex md:items-center md:justify-between",
      container: "w-full p-6",
      bgDark: "bg-gray-800",
    },
    groupLink: {
      base: "flex flex-wrap text-sm text-gray-500 dark:text-white",
      link: {
        base: "me-4 last:mr-0 md:mr-6",
        href: "hover:underline",
      },
      col: "flex-col space-y-4",
    },
    icon: {
      base: "text-gray-500 dark:hover:text-white",
      size: "h-5 w-5",
    },
    title: {
      base: "mb-6 text-sm font-semibold uppercase text-gray-500 dark:text-white",
    },
    divider: {
      base: "my-6 w-full border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8",
    },
    copyright: {
      base: "text-sm text-gray-500 dark:text-gray-400 sm:text-center",
      href: "ml-1 hover:underline",
      span: "ml-1",
    },
    brand: {
      base: "mb-4 flex items-center sm:mb-0",
      img: "mr-3 h-8",
      span: "self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white",
    },
  },
};
