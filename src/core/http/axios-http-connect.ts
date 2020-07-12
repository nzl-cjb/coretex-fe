import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { APIServiceHelper } from "services/api/api-service-helper";
import {
  HttpConnect,
  QueryParameters,
  HTTPResponse,
  HttpMethod,
} from "./http-connect";
import * as HttpStatus from "http-status-codes";

/**
 * Axios implementation of Connect interface
 *
 * @see Connect
 */
export class AxiosHttpConnect implements HttpConnect {
  public constructor(private readonly axios: AxiosInstance) {}

  private API_HOST: string = "http://localhost:50235/";

  public static create(): HttpConnect {
    return new AxiosHttpConnect(
      Axios.create({
        timeout: 5000,
      })
    );
  }

  public async get<R>(
    path: string,
    params?: QueryParameters
  ): Promise<HTTPResponse<R>> {
    const config = await this.createRequestConfig(params);
    return this.axios
      .get<R>(this.getHostAndPath(path), config)
      .then(this.toResponse, this.reject);
  }

  public async put<P, R>(path: string, payload?: P): Promise<HTTPResponse<R>> {
    const config = await this.createRequestConfig();
    return this.axios
      .put<R>(this.getHostAndPath(path), payload, config)
      .then(this.toResponse, this.reject);
  }

  public async post<P, R>(path: string, payload: P): Promise<HTTPResponse<R>> {
    const config = await this.createRequestConfig();
    return this.axios
      .post<R>(this.getHostAndPath(path), payload, config)
      .then(this.toResponse, this.reject);
  }

  public async patch<P, R>(
    path: string,
    payload?: P
  ): Promise<HTTPResponse<R>> {
    const config = await this.createRequestConfig();
    return this.axios
      .patch<R>(this.getHostAndPath(path), payload, config)
      .then(this.toResponse, this.reject);
  }

  public async delete<R>(path: string): Promise<HTTPResponse<R>> {
    const config = await this.createRequestConfig();
    return this.axios
      .delete(this.getHostAndPath(path), config)
      .then(this.toResponse, this.reject);
  }

  private async createRequestConfig(
    params?: QueryParameters
  ): Promise<AxiosRequestConfig> {
    const config: AxiosRequestConfig = {
      // Throw an error if the http status is greater than or equal to 500. Other responses will return a Response<T> with status code.
      validateStatus: (status) => status < 500,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    };

    if (params) {
      config.params = params;
    }

    return config;
  }

  // eslint-disable-next-line class-methods-use-this
  private reject(error: any): any {
    const defaultErrorMessage = "Sorry, something went wrong";
    const responseError = {
      data: "",
      headers: error?.response?.headers || {},
      code: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      status: error?.response?.statusText || defaultErrorMessage,
      error: error?.response?.data || {},
      success: false,
    };
    APIServiceHelper.throwResponseError<any>(responseError);
  }

  // eslint-disable-next-line class-methods-use-this
  private toResponse<T>(response: AxiosResponse<T>): HTTPResponse<T> {
    let httpResponse: HTTPResponse<T>;
    // Tagging all HTTP codes from 300 and above as failed request
    // nothing will be discarded to allow a new check in client layer
    if (response.status >= 300) {
      httpResponse = {
        data: undefined,
        headers: response.headers,
        code: response.status,
        status: response.statusText,
        error: response.data,
        success: false,
      };
      return httpResponse;
    }

    httpResponse = {
      data: response.data,
      headers: response.headers,
      code: response.status,
      status: response.statusText,
      error: undefined,
      success: true,
    };

    return httpResponse;
  }

  private getHostAndPath(path: string): string {
    const url: URL = new URL(path, this.API_HOST);
    return url.toString();
  }
}
