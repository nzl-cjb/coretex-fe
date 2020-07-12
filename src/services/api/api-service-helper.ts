import { HTTPResponse } from "core/http/http-connect";

/**
 * Helper functions and boiler plate code for use in API services
 */
export abstract class APIServiceHelper {
  private static readonly errorType: string = "ServiceAPI";

  /**
   * Throw a standardised error message when an unexpected error occurs requesting a resource
   *
   * @param message custom error message
   * @param response response from request
   * @param rootPath full request path
   */
  public static throwResponseError<T>(response: HTTPResponse<T>): Error {
    const error = new Error(response.error);
    throw error;
  }

  private static concatErrorPrefix(message: string, rootPath: string): string {
    return `${APIServiceHelper.errorType} - ${rootPath} - ${message}`;
  }
}
