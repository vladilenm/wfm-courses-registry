import { Course } from '../models/course.model';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CoursesService {
  courses: Course[] = [];

  constructor(private http: HttpService) {}

  public getCourses() {
    return this.http.getCourses();
  }

  public updateCourse(id: number, name: string) {
    return this.http.updateCourse({courseId: id, name});
  }

  public addCourse(name) {
    return this.http.createCourse(name);
  }

  public deleteCourse(id: number) {
    return this.http.deleteCourse({courseId: id});
  }
}
