import { HttpRequest } from "@angular/common/http";

export class Utils {

  public static getPathname(url: string) {
    try {
      const urlTree = new URL(url);

      if (!urlTree.pathname) {
        return null;
      }

      return urlTree.pathname.substring(1);
    } catch (e) {
      return null;
    }
  }

  public static attachToken(request: HttpRequest<any>, jwt: String): HttpRequest<any> {
    if (!jwt) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + jwt
      }
    });
  }
}
