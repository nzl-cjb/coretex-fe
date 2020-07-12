/**
 * Standard Http response with data of type R
 */
export interface HTTPResponse<R> {
  data?: R;
  code: number;
  status: string;
  headers: any;
  error: any;
  success: boolean;
}

/**
 * Indexable object of query parameters
 */
export interface QueryParameters {
  [name: string]: any;
}

export enum HttpMethod {
  POST = "POST",
  PUT = "PUT",
  GET = "GET",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

// Interface to use back-end services
export interface HttpConnect {
  /**
   * Get a Response returning payload of type R from path
   *
   * @param path
   */
  get<R>(path: string, params?: QueryParameters): Promise<HTTPResponse<R>>;

  /**
   * Update a resource with payload of type P, returning response of type R
   *
   * @param path
   * @param payload
   */
  put<P, R>(path: string, payload: P): Promise<HTTPResponse<R>>;

  /**
   * Create a resource with payload of type P, returning resposne of type R
   *
   * @param path
   * @param payload
   */
  post<P, R>(path: string, payload: P): Promise<HTTPResponse<R>>;

  /**
   * patch a resource with payload of type P, returning response of type R
   *
   * @param path
   * @param payload
   */

  patch<P, R>(path: string, payload: P): Promise<HTTPResponse<R>>;

  /**
   * Delete a resource on path, returning response of type R
   *
   * @param path
   */
  delete<R>(path: string): Promise<HTTPResponse<R>>;
}
