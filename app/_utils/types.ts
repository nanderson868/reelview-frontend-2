// types.ts

// Data types:

export type ItemData<T> = T & {
  id: number;
};

export interface UserData
  extends ItemData<{
    username: string;
    movie_count: number;
    synced_at: string;
    added_at: string;
  }> {}

export interface FilmData
  extends ItemData<{
    title: string;
    year: string;
  }> {}

// API types:

export type ItemQuery<T> = Partial<ItemData<T>>;

export type QueryStatus = "success" | "error" | "pending";

export type QueryResult<T> =
  | { status: "success"; data: ItemData<T> }
  | { status: "error"; error: string }
  | { status: "pending" };

export type QueryEntry<T> = QueryResult<T> & {
  query: ItemQuery<T>;
};

export type QueryCache<T> = {
  [id: number]: QueryEntry<T>;
};

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type APIRequest<T> = ItemQuery<T>[];
export type APIResponse<T> = QueryResult<T>[];

// Message types:

export interface NewMessage {
  type: "error" | "info" | "warning" | "success";
  message: string;
}

export interface Message extends NewMessage {
  // id: number;
  timestamp: number;
}
