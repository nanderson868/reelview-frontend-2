import { APIResponse, RequestMethod } from "_utils/types";
import axios from "axios";
import { APIConfig } from "../../config";

export default class Backend<T> {
  async request(
    method: RequestMethod,
    endpoint: string,
    data?: any,
  ): Promise<APIResponse<T>> {
    const url = `${APIConfig.baseURL}/${endpoint}`;
    try {
      const response = await axios({ method, url, data });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || error.message || "Unknown error";
      throw new Error(`API Error at ${url}: ${errorMessage}`);
    }
  }
}
