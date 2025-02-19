import HttpClient from "./IHttpClient";
import axios from "axios";

export default class AxiosAdapter implements HttpClient {
  async get(url: string): Promise<any> {
    const res = await axios.get(url);
    return res.data;
  }

  async post(url: string, data: any): Promise<any> {
    try {
      const res = await axios.post(url, data);
      return res.data;
    } catch (error) {
      console.error(`Error in post: ${error}`);
      throw error;
    }
  }

  async put(url: string, data: any): Promise<any> {
    const res = await axios.put(url, data);
    return res.data;
  }

  setHeaders(headers: any) {
    axios.defaults.headers = headers;
  }
}