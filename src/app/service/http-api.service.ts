import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

export interface ResponseType {
  message: string;
  result: any[];
  status: string;
}

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class HttpApi {
  public url: string = 'http://localhost:8080/api';

  constructor(public http: HttpClient) {
  }

  get<T>(endpoint: string, params?: any, options?: {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }) {
    if (params) {
      if (!options) {
        options = {'params': params};
      } else {
        options['params'] = params;
      }
    }

    return this.http.get<T>(this.url + '/' + endpoint);
    // return this.http.get<T>(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: any) {
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: any) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: any) {
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: any) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
}
