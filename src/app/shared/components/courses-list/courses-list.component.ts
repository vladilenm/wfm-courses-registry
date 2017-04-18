import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  private courses: Course[] = [];
  private courseFilter = '';
  private isLoading = true;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.coursesService.getCourses()
      .subscribe((courses) => {
        this.isLoading = false;
        this.courses = courses;
      });
  }
}
