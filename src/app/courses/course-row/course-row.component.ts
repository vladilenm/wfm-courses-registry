import { Component, Input } from '@angular/core';
import { Course } from '../../shared/course.model';
import { CoursesService } from '../../shared/courses.service';

@Component({
  selector: '[app-course-row]',
  templateUrl: './course-row.component.html',
  styleUrls: ['./course-row.component.css']
})
export class CourseRowComponent {

  @Input() course: Course;

  constructor(private coursesService: CoursesService) {
  }

  onUpdate(newName: string) {
    this.coursesService.updateCourse(this.course.id, newName)
  }

}
