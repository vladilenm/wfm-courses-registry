import { Course } from './course.model';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CoursesService {
  courses: Course[] = [];

  constructor(private http: HttpService) {}

  public getCourses(): Course[] {
    this.http.getCourses()
      .subscribe((courses) => {
        console.log('dsadas', courses);
      });
    return this.courses;
  }

  public updateCourse(id: number, name: string): void {
    this.courses.find(c => c.id === id).name = name;
  }

  public addCourse(course: Course): void {
    this.courses.push(course);
  }

  public deleteCourse(id: number): Course[] {
    return this.courses = this.courses.filter(c => c.id !== id);
  }
}
