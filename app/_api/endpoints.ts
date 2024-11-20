// _api/endpoints.ts
import {
  APIResponse,
  UserData,
  FilmData,
  QueryResult,
  RequestMethod,
} from "../_utils/types";
import { QueryCache } from "_utils/types";
import Backend from "./backend";

const endpointConfig = {
  suggest: { method: "GET", params: { username: "" } },
  get: { method: "GET", params: { id: 0 } },
  search: { method: "GET", params: { username: "" } },
  add: { method: "POST", params: { username: "" } },
  sync: { method: "POST", params: { ids: [] as number[] } },
};

type EndpointKeys = keyof typeof endpointConfig;

type EndpointArgs<K extends EndpointKeys> =
  (typeof endpointConfig)[K]["params"];

type HasProperty<T, K extends PropertyKey> = K extends keyof T ? true : false;

type ValidEndpoint<T, K extends EndpointKeys> =
  HasProperty<T, keyof EndpointArgs<K>> extends true ? K : never;

type ValidEndpoints<T> = {
  [K in EndpointKeys as ValidEndpoint<T, K>]: (
    arg: EndpointArgs<K>,
  ) => Promise<APIResponse<T>>;
};

class API<T> {
  endpoints: ValidEndpoints<T> = {};
  cache: QueryCache<T> = {};

  constructor(
    private backend: Backend<T>,
    private name: string,
  ) {
    this.constructEndpoints();
  }

  private constructEndpoints(): void {
    (Object.keys(endpointConfig) as Array<keyof typeof endpointConfig>).forEach(
      (key) => {
        const method = endpointConfig[key].method as RequestMethod;
        const argKeys = Object.keys(
          endpointConfig[key].params,
        ) as (keyof EndpointArgs<typeof key>)[];

        if (this.hasProperty(key)) {
          (this.endpoints as any)[key] = async (arg: any) => {
            const queryParams = argKeys
              .map((k) => `${String(k)}=${encodeURIComponent(arg[k])}`)
              .join("&");
            return this.backend.request(
              method,
              `${this.name}/${key}?${queryParams}`,
            );
          };
        }
      },
    );
  }

  private hasProperty<K extends EndpointKeys>(key: K): boolean {
    const requirementKeys = Object.keys(endpointConfig[key]).filter(
      (k) => k !== "method",
    );
    return requirementKeys.every((reqKey) => (reqKey in {}) as T);
  }

  private updateCache(id: number, result: QueryResult<T>): void {
    this.cache[id] = { ...this.cache[id], ...result };
  }

  private needsRefresh(result: QueryResult<T>): boolean {
    // Implement more advanced logic to determine if cached data needs to be refreshed.
    return false; // Placeholder
  }
}

// Example Usage:
const users = new API<UserData>(new Backend<UserData>(), "users");
users.endpoints.get({ id: 5 });
users.endpoints.suggest({ username: "johndoe" });
const films = new API<FilmData>(new Backend<FilmData>(), "films");
films.endpoints.get({ id: 5 });
// @ts-expect-error
films.endpoints.suggest({ username: "johndoe" }); // Property 'suggest' does not exist on type 'ValidEndpoints<FilmData>'
