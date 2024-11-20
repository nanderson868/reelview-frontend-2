import { Message, NewMessage } from "./types";

export default class Inbox {
  private setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  private intervalId: number | null = null;
  private messageDuration = 3000;

  constructor(setMessages: React.Dispatch<React.SetStateAction<Message[]>>) {
    this.setMessages = setMessages;
  }

  private addMessage(message: NewMessage) {
    const timestamp = Date.now();
    const newMessage = { ...message, timestamp };

    this.setMessages((prevMessages) => [...prevMessages, newMessage]);
    this.ensureTimerRuns();
  }

  private ensureTimerRuns() {
    if (this.intervalId === null) {
      this.intervalId = window.setInterval(() => {
        // Use window.setInterval to specify the browser API
        const currentTime = Date.now();
        this.setMessages((prevMessages) => {
          const filteredMessages = prevMessages.filter(
            (msg) => currentTime - msg.timestamp < this.messageDuration,
          );
          // Stop the timer if there are no messages left
          if (filteredMessages.length === 0) {
            clearInterval(this.intervalId as number); // Assert intervalId as number for clearInterval
            this.intervalId = null;
          }
          return filteredMessages;
        });
      }, this.messageDuration) as unknown as number; // Cast the return type of setInterval to number explicitly
    }
  }

  public error(message: string = "Something went wrong") {
    this.addMessage({ type: "error", message });
  }

  public warning(message: string) {
    this.addMessage({ type: "warning", message });
  }

  public info(message: string) {
    this.addMessage({ type: "info", message });
  }

  public success(message: string) {
    // this.addMessage({ type: "success", message });
  }

  public clear() {
    this.setMessages([]);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Cleanup when component unmounts or Inbox is no longer needed
  public componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
