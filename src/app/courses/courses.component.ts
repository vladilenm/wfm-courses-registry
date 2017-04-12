import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../shared/courses.service';
import { Course } from '../shared/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  private newCourseName: string;
  private courses: Course[];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
  }

  public onAdd() {
    if (this.newCourseName === '') {
      return;
    }
    let id = this.courses[this.courses.length - 1].id;
    this.coursesService.addCourse({id: ++id, name: this.newCourseName});
    this.newCourseName = '';
  }

}
