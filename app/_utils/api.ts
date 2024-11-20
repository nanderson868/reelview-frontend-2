// utils/api.ts
import axios from "axios";
import {
  QueryResult,
  ItemData,
  ItemCache,
  UserData,
  Query,
} from "_utils/types";

class API {
  private static instance: API;
  private baseURL: string;
  private userCache: ItemCache<UserData> = {};

  static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }
    return API.instance;
  }

  constructor() {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Missing backend URL");
    }
    this.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  }

  private async request<T>(
    method: "GET" | "POST" | "PUT",
    endpoint: string,
    data?: Query<T>[] | Query<T>,
  ): Promise<QueryResult<T>[] | QueryResult<T>> {
    const url = `${this.baseURL}/api/${endpoint}`;

    try {
      let resultData = await axios({
        method,
        url,
        data,
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.data as QueryResult<T> | QueryResult<T>[]);
      return resultData;
    } catch (error) {
      throw new Error("API error");
    }
  }

  // if (Array.isArray(resultData)) {
  //   const cacheQueryQueryResult = (query: Query) => {
  //     if (query.id)
  //       this.userCache[query.id] = { query, data: resultData.find() };
  //   };
  //   resultData.forEach((result) => {
  //     cacheQueryQueryResult(result.query);
  //   });
  // }

  // data?.forEach((query) => {
  //   this.userCache[query.id] = { query, data: results };
  // });

  // this.userCache = { ...this.userCache, ...results };
  // return results;

  public get<T>(endpoint: string): Promise<ItemCache | QueryResult> {
    return this.request("GET", endpoint);
  }

  public post(
    endpoint: string,
    data: QueryResult<T>[],
  ): Promise<ItemCache | QueryResult> {
    return this.request("POST", endpoint, data);
  }

  public put(endpoint: string, data: any): Promise<Cache | QueryResult> {
    return this.request("PUT", endpoint, data);
  }

  public async getUser(query: Query): Promise<QueryResult> {
    if (query.id && this.userCache[query.id]) {
      return this.userCache[query.id];
    } else if (query.value) {
      try {
        const data = (await this.post("get", [query])).data as UserData;
        return { query, data };
      } catch (error) {
        console.error("Failed to get user", error);
        return { query, error };
      }
    } else {
      throw new Error("Invalid query");
    }
  }

  // public storeUser(username: string) {
  //   if (this.cache[username]) {
  //     this.store.push(this.cache[username]);
  //   }
  // }

  public getData(): ItemCache {
    return this.userCache;
  }

  /**
   * Search for users by username
   * @param username
   */
  public async getUserSuggestions(query: Query): Promise<number[]> {
    const username = query.value;
    if (!username) return [];
    try {
      const results = await this.post("suggest", query.value);
      // users.forEach((user) => {
      //   this.cache[user.id] = { query: { value: username }, data: user };
      // });
      const users = Object.values(results).map(
        (result) => result.data as Partial<UserData>,
      );
      const usernames = users.map((user) => user.username!);
    } catch (error) {
      console.error("Failed to search users", error);
      return [];
    }
  }

  public probeUsers(usernames: string[]): Promise<QueryCache> {
    return this.post("probe", { usernames });
  }

  public syncUsers(usernames: string[]): Promise<void> {
    return this.post("sync", { usernames });
  }
}

export default API.getInstance();
