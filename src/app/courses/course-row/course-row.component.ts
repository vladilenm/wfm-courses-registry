import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../shared/course.model';
import { CoursesService } from '../../shared/courses.service';

@Component({
  selector: '[app-course-row]',
  templateUrl: './course-row.component.html',
  styleUrls: ['./course-row.component.css']
})
export class CourseRowComponent {

  @Input() course: Course;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(private coursesService: CoursesService) {
  }

  onUpdate(newName: string) {
    this.coursesService.updateCourse(this.course.id, newName)
      .subscribe((course) => {
        this.course = course;
      });
  }

  onDelete(): void {
    this.deleted.emit(this.course.id);
  }

}
