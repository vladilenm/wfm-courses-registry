import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../shared/models/course.model';
import { CoursesService } from '../../shared/services/courses.service';
import { notifyOptions } from '../../shared/constants';
import { NotificationsService } from 'angular2-notifications/dist';

@Component({
  selector: '[app-course-row]',
  templateUrl: './course-row.component.html',
  styleUrls: ['./course-row.component.css']
})
export class CourseRowComponent {

  @Input() course: Course;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();
  private options = notifyOptions;

  constructor(private coursesService: CoursesService, private notifications: NotificationsService) {
  }

  onUpdate(newName: string) {
    this.coursesService.updateCourse(this.course.id, newName)
      .subscribe((course) => {
        if (!Array.isArray(course)) {
          this.course = course;
        }
        this.notifications.success(
          'Уведомление',
          'Курс успешно обновлен'
        );
      });
  }

  onDelete(): void {
    this.deleted.emit(this.course.id);
  }

}
