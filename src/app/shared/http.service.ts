import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as $ from 'jquery';

@Injectable()
export class HttpService {

  constructor(private http: Http) {}

  public getCourses() {
    return this.sendRequest({
      operation: 'getCourses'
    });
  }

  public createCourse(params: any) {
    params.operation = 'createCourse';
    return this.sendRequest(params);
  }

  public updateCourse(course: any) {
    course.operation = 'updateCourse';
    return this.sendRequest(course);
  }

  public deleteCourse(params: any) {
    params.operation = 'deleteCourse';
    return this.sendRequest(params);
  }

  public getPeople(params: any) {
    params.operation = 'getPeople';
    return this.sendRequest(params);
  }

  public createPerson(params: any) {
    params.operation = 'createPerson';
    return this.sendRequest(params);
  }

  public getPersonCourses(params: any) {
    params.operation = 'getPersonCourses';
    return this.sendRequest(params);
  }

  public getPersonById(params: any) {
    params.operation = 'getPersonCourse';
    return this.sendRequest(params);
  }

  public updatePerson(params: any) {
    params.operation = 'updatePerson';
    return this.sendRequest(params);
  }

  public deletePerson(params: any) {
    params.operation = 'deletePerson';
    return this.sendRequest(params);
  }

  private sendRequest(params: any) {
    return this.http.get(this.getUrl(params)).map((response: Response) => response.json());
  }

  private getUrl(params: any): string {
    return 'https://webformyself.com/oursupport/backend/?' + $.param(params);
  }
}
