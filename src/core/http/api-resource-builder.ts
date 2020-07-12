import { ApiResource, PathValues } from "./api-resource";
import { ApiEndpoint, ApiEndpoints, PathName } from "./api-endpoints";

export interface ApiPaths {
  [key: string]: ApiResource;
}

/**
 * Build an API resource
 */
class ApiResourceBuilder {
  private readonly paths: ApiPaths = {};

  public constructor(values: ApiEndpoint[]) {
    values.forEach((resource) => {
      this.paths[resource.name] = new ApiResource(resource);
    });
  }

  /**
   * Get a known path an replace path params with known values.
   *
   * @see PathName for available paths
   *
   * @param name
   * @param values
   */
  public getPath(name: PathName, values?: PathValues): string {
    const path = this.paths[name].toPath(values);
    return path;
  }

  public get(name: PathName): ApiResource {
    return this.paths[name];
  }

  public values(): ApiResource[] {
    return Array.from(Object.values(this.paths));
  }
}

export const resources = new ApiResourceBuilder(ApiEndpoints);
