"use client";
import React, { createContext, useState } from "react";
import Inbox from "_utils/inbox";
import { Message } from "_utils/types";

export const InboxContext = createContext<{
  inbox: Inbox;
  messages: Message[];
} | null>(null);

export function InboxProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const inbox = new Inbox(setMessages);

  return (
    <InboxContext.Provider value={{ inbox, messages }}>
      {children}
    </InboxContext.Provider>
  );
}
