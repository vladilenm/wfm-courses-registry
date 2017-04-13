import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import * as $ from 'jquery';

@Injectable()
export class HttpService {

  private headers: Headers = new Headers({
    'Content-Type': 'x-www-form-urlencoded'
  });

  constructor(private http: Http) {}

  getCourses() {
    return this.http.get(this.getUrl({
      operation: 'getCourses'
    }), {headers: this.headers})
      .map((response: Response) => response.json());
  }

  private getUrl(params: any): string {
    const string = $.param(params);
    return 'https://webformyself.com/oursupport/backend/?' + string;
  }
}
