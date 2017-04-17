import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../shared/courses.service';
import { Course } from '../shared/course.model';

import swal from 'sweetalert2';
import { NotificationsService } from 'angular2-notifications/dist';
import { notifyOptions } from '../shared/notify.options';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  private form: FormGroup;
  private courses: Course[] = [];
  private isLoading = true;
  private options = notifyOptions;

  constructor(private coursesService: CoursesService, private notifications: NotificationsService) { }

  ngOnInit() {

    this.coursesService.getCourses()
      .subscribe((courses: Course[]) => {
        this.isLoading = false;
        this.courses = courses;
      });

    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.coursesService.addCourse({
      name: this.form.get('name').value
    }).subscribe((course: Course) => {
      this.notifications.success(
        'Уведомление',
        'Курс успешно добавлен'
      );
      this.courses.push(course);
    });
    this.form.reset();
  }

  onDelete(courseId: number) {
    const courseName = this.courses.filter(c => c.id === courseId)[0].name;
    swal({
      title: 'Подтвердите действие',
      text: `Вы уверены, что хотите удалить курс ${courseName}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Да, удалить!',
      cancelButtonText: 'Отмена',
    }).then(() => {
      this.coursesService.deleteCourse(courseId)
        .subscribe(({id}) => {
          this.courses = this.courses.filter(c => c.id !== id);
          this.notifications.success(
            'Уведомление',
            'Курс успешно удален'
          );
        });
    }).catch(() => {
      this.notifications.error(
        'Уведомление',
        'Ошибка сервера'
      );
    });
  }

}
