/* eslint-disable max-classes-per-file */
import { ApiEndpoint } from "./api-endpoints";
import { HttpMethod } from "./http-connect";

export interface PathValues {
  [key: string]: any;
}

/**
 * A single API resource with templated path parameters
 */
export class ApiResource {
  private readonly matchRegex: RegExp;

  public constructor(private readonly resource: ApiEndpoint) {
    this.matchRegex = new RegExp(resource.path.replace(/({)(.*?)(})/g, "\\w+"));
  }

  /**
   * Get the name of the resource
   */
  public get name(): string {
    return this.resource.name;
  }

  public get method(): HttpMethod {
    return this.resource.method;
  }

  public match(path: string, method: HttpMethod = HttpMethod.GET): boolean {
    return this.matchRegex.test(path) && this.resource.method === method;
  }

  /**
   * Get the path with substituted path values
   *
   * @param values
   */
  public toPath(values?: PathValues): string {
    let { path } = this.resource;

    if (values) {
      Object.keys(values).forEach((k) => {
        path = path.replace(`{${k}}`, encodeURIComponent(values[k]));
      });
    }

    const matches = /(\{\w+\})/.exec(path);
    if (matches) {
      throw new Error(`The path contains unmatched parameters ${matches}`);
    }

    return path;
  }

  /**
   * Get a complete URL of the resource. The host may be overridden from the definition,
   * but where the host has not been defined in the api resource, then one must be supplied.
   *
   * @param values
   * @param host
   */
  public toURL(values?: PathValues, host?: string): URL {
    if (!this.resource.host && !host) {
      throw new Error("API resource does not have a host");
    }

    return new URL(this.toPath(values), host || this.resource.host);
  }
}
