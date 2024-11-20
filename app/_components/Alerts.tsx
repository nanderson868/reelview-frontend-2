"use client";
import React from "react";
import {
  HiOutlineInformationCircle,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { Toast } from "flowbite-react";
import { useInbox } from "_hooks/useInbox";
import { Message } from "_utils/types";

export default function Alerts() {
  const { messages } = useInbox();
  const renderIcon = (type: string) => {
    switch (type) {
      case "error":
        return <HiOutlineExclamationCircle color="failure" size={16} />;
      case "info":
      default:
        return <HiOutlineInformationCircle color="info" size={16} />;
      case "success":
        return <HiOutlineCheckCircle color="success" size={16} />;
      case "warning":
        return <HiOutlineExclamationCircle color="yellow" size={16} />;
    }
  };
  return (
    <div className="alerts-wrapper">
      {messages.map((message: Message, index) => (
        <Toast className=" dark:bg-secondary" key={index}>
          {renderIcon(message.type)}
          <div className="pl-4 text-sm font-normal">{message.message}</div>
        </Toast>
      ))}
    </div>
  );
}
