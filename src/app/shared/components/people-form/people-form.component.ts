import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMyDateModel, IMyOptions } from 'mydatepicker';
import * as moment from 'moment';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications/dist';
import { Course } from '../../models/course.model';
import { notifyOptions } from '../../constants';
import { CoursesService } from '../../services/courses.service';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PeopleFormComponent implements OnInit {
  private form: FormGroup;
  private courses: Course[] = [];
  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd.mm.yyyy',
  };
  private options = notifyOptions;

  @Input() person;

  private isEdit = false;

  private actionName = 'Добавить';

  constructor(private coursesService: CoursesService,
              private peopleService: PeopleService,
              private router: Router,
              private notifications: NotificationsService) {
  }

  ngOnInit() {
    this.coursesService.getCourses()
      .subscribe((courses) => {
        this.courses = courses;
      });

    if (this.person) {
      this.isEdit = true;
    }

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'start': new FormControl('', Validators.required),
      'end': new FormControl('', Validators.required),
      'course': new FormControl(null, Validators.required),
    });

    if (this.isEdit) {
      this.setPersonValues();
      this.actionName = 'Редактировать';
    } else {
      this.setDefaultDates();
    }
  }

  setPersonValues() {
    this.form.setValue({
      'email': this.person.email,
      'course': this.person.courseId,
      'start': this.getDTValue(moment(this.person.dateStart, 'YYYY.MM.DD')),
      'end': this.getDTValue(moment(this.person.dateEnd, 'YYYY.MM.DD'))
    });
  }

  private getDTValue(m) {
    return {
      date: {
        year: m.format('YYYY'),
        month: m.format('M'),
        day: m.format('D')
      }
    };
  }

  private setDefaultDates() {
    const start = moment();
    const end = moment().add(3, 'M');
    this.form.patchValue(
      {
        'start': this.getDTValue(start),
        'end': this.getDTValue(end)
      });
  }

  public onStartChanged(event: IMyDateModel) {
    const end = moment(event.formatted, 'DD.MM.YYYY').add(3, 'M');
    if (end.isValid()) {
      this.form.patchValue({'end': this.getDTValue(end)});
    } else {
      this.form.patchValue({'end': ''});
    }
  }

  public onDelete() {
    swal({
      title: 'Подтвердите действие',
      text: `Вы уверены, что хотите удалить пользователя ${this.person.email}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Да, удалить!',
      cancelButtonText: 'Отмена',
    }).then(() => {
      this.peopleService.deletePerson(this.person.customerId)
        .subscribe((res) => {
          this.router.navigate(['/course', 1]);
        });
    }).catch(() => {
    });
  }

  public onSubmit() {
    const {value} = this.form;
    const person = {
      email: value.email,
      dateStart: this.getDate(value.start.date),
      dateEnd: this.getDate(value.end.date),
      courseId: +value.course
    };

    if (!this.isEdit) {
      this.addPerson(person);
    } else {
      this.updatePerson(person);
    }
  }

  private addPerson(person) {
    this.peopleService.addPerson(person)
      .subscribe((response) => {
        if (response.error) {
          swal('Oops...', response.error, 'error');
        } else {
          this.notifications.success(
            'Уведомление',
            'Пользователь добавлен'
          );
        }
      });
    this.form.reset();
    this.setDefaultDates();
  }

  private updatePerson(person) {
    const updatedPerson = Object.assign(person, {
      id: this.person.customerId,
      oldCourseId: this.person.courseId
    });
    this.peopleService.updatePerson(updatedPerson)
      .subscribe((response) => {
        if (response.error) {
          swal('Oops...', response.error, 'error');
        } else {
          this.notifications.success(
            'Уведомление',
            'Пользователь обновлен'
          );
        }
      });
  }

  private getDate(value: any): string {
    const date = value.day + '.' + value.month + '.' + value.year;
    return moment(date, 'DD.M.YYYY').format('YYYY.MM.DD');
  }

}
