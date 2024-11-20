// "use client";
// import axios from "axios";
// import { createContext, useState } from "react";
// import { QueryCache } from "_utils/types";
// import { useInbox } from "_hooks/useInbox";
// import React from "react";

// export const APIContext = createContext<{
//   queryResults: QueryCache;
//   fetching: boolean;
//   saveUsers: (results: QueryResults) => Promise<void>;
//   searchUser: (username: string) => Promise<void>;
//   findUsers: (usernames: string[]) => Promise<void>;
//   syncUsers: (usernames: string[]) => Promise<void>;
// } | null>(null);

// export const APIProvider = ({ children }: { children: React.ReactNode }) => {
//   const [queryResults, setQueryResults] = useState<QueryResults>({});
//   const [savedResults, setSavedResults] = useState<QueryResults>({});
//   const [fetching, setFetching] = useState(false);

//   const { inbox } = useInbox();

//   const fetchData = async (endpoint: string, data: any) => {
//     setFetching(true);
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${endpoint}`,
//         data,
//       );
//       console.log("API response:", response.data);
//       inbox.success("Request successful");
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error("API error:", error);
//         inbox.error(error.response?.statusText);
//       } else {
//         console.error("Unexpected error:", error);
//         inbox.error("An unexpected error occurred");
//       }
//     } finally {
//       setFetching(false);
//     }
//   };

//   const searchUser = async (username: string) => {
//     const response = await fetchData("search", { usernames: [username] });
//     setQueryResults((prevData) => {
//       const prevUser = prevData[username];
//       return { ...prevData, ...{ ...prevUser, ...response } };
//     });
//   };

//   const findUsers = async (usernames: string[]) => {
//     const response = await fetchData("find", { usernames });
//     setQueryResults(response);
//   };

//   const syncUsers = async (usernames: string[]) => {
//     const response = await fetchData("sync", { usernames });
//     setSavedResults((prevData) => {
//       return { ...prevData, ...response };
//     });
//   };

//   const saveUsers = async (results: QueryResults) => {
//     if (!queryResults) return;
//     setSavedResults((prevData) => {
//       return { ...prevData, ...results };
//     });
//   };

//   return (
//     <APIContext.Provider
//       value={{
//         queryResults,
//         fetching,
//         saveUsers,
//         searchUser,
//         findUsers,
//         syncUsers,
//       }}
//     >
//       {children}
//     </APIContext.Provider>
//   );
// };
