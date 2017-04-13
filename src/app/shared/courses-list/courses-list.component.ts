import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  private courses: Course[] = [];
  private courseFilter: string = '';

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.coursesService.getCourses()
      .subscribe((courses) => {
        this.courses = courses;
      });
  }
}
