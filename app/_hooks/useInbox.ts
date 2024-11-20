import { useContext } from "react";
import { InboxContext } from "_contexts/InboxContext";

export function useInbox() {
  const context = useContext(InboxContext);
  if (!context) {
    throw new Error("useInbox must be used within an InboxProvider");
  }
  return context;
}
