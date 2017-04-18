import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as $ from 'jquery';
import { AuthService } from './auth.service';

@Injectable()
export class HttpService {

  constructor(private http: Http, private authService: AuthService) {
  }

  public getCourses() {
    return this.sendRequest({}, 'getCourses');
  }

  public createCourse(params: any) {
    return this.sendRequest(params, 'createCourse');
  }

  public updateCourse(course: any) {
    return this.sendRequest(course, 'updateCourse');
  }

  public deleteCourse(params: any) {
    return this.sendRequest(params, 'deleteCourse');
  }

  public getPeople(params: any) {
    return this.sendRequest(params, 'getPeople');
  }

  public createPerson(params: any) {
    return this.sendRequest(params, 'createPerson');
  }

  public getPersonCourses(params: any) {
    return this.sendRequest(params, 'getPersonCourses');
  }

  public getPersonById(params: any) {
    return this.sendRequest(params, 'getPersonCourse');
  }

  public updatePerson(params: any) {
    return this.sendRequest(params, 'updatePerson');
  }

  public deletePerson(params: any) {
    return this.sendRequest(params, 'deletePerson');
  }

  private sendRequest(params: any, operation: string) {
    params.operation = operation;
    params.token = this.authService.getToken();
    return this.http.get(this.getUrl(params)).map((response: Response) => response.json());
  }

  private getUrl(params: any): string {
    return 'https://webformyself.com/oursupport/backend/?' + $.param(params);
  }
}
