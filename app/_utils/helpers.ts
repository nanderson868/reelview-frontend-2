import { formatInTimeZone } from "date-fns-tz";

export const utcToLocal = (syncedAt: string | null) => {
  /**
   * This function will format the syncedAt time (UTC) in the user's local time zone
   * @param {string} syncedAt - The syncedAt time in UTC
   * @returns {string} - The formatted syncedAt time in the user's local time zone
   */
  if (!syncedAt) {
    return "-";
  }
  // Retrieve the user's current time zone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // The syncedAt should be parsed as a UTC time and formatted to the local time zone
  const date = new Date(syncedAt + "Z"); // Ensure the date is treated as UTC by adding 'Z'
  // Format the UTC date in the local time zone
  const displayDate = formatInTimeZone(
    date,
    userTimezone,
    "yyyy-MM-dd hh:mm:ss a zzz",
  );

  console.log("Value on backend (utc): ", syncedAt);
  console.log("userTimezone: ", userTimezone);
  console.log("currentTime: ", new Date().toLocaleTimeString());
  console.log("display date (syncedAt in user's timezone): ", displayDate);

  return displayDate;
};

export const timeAgo = (syncedAt: string | null) => {
  /**
   * This function will return a human-readable string representing the time elapsed since the last sync
   * @param {string} syncedAt - The syncedAt time in UTC
   * @returns {string} - A human-readable string representing the time elapsed since the last sync
   */
  if (!syncedAt) {
    return null;
  }

  const syncedAtDate = new Date(syncedAt + "Z"); // Convert UTC to local Date object
  const now = new Date();
  const secondsAgo = Math.floor(
    (now.getTime() - syncedAtDate.getTime()) / 1000,
  );

  if (secondsAgo < 60) {
    return secondsAgo == 0
      ? "just now"
      : `${secondsAgo} second${secondsAgo > 1 ? "s" : ""} ago`;
  } else if (secondsAgo < 3600) {
    const minutes = Math.floor(secondsAgo / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (secondsAgo < 86400) {
    const hours = Math.floor(secondsAgo / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(secondsAgo / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};
