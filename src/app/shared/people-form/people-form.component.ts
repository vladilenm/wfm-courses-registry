import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMyDateModel, IMyOptions } from 'mydatepicker';
import * as moment from 'moment';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { PeopleService } from '../people.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  @Input() person;

  private actionName = 'Добавить';

  constructor(
    private coursesService: CoursesService,
    private peopleService: PeopleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.coursesService.getCourses()
      .subscribe((courses) => {
        this.courses = courses;
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'start': new FormControl('', Validators.required),
      'end': new FormControl('', Validators.required),
      'course': new FormControl(null, Validators.required),
    });

    if (this.person) {
      this.setPersonValues();
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
    this.actionName = 'Редактировать';
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

  setDefaultDates() {
    const start = moment();
    const end = moment().add(3, 'M');
    this.form.patchValue(
      {
        'start': this.getDTValue(start),
        'end': this.getDTValue(end)
      });
  }

  onStartChanged(event: IMyDateModel) {
    const start = moment(event.formatted, 'DD.MM.YYYY').add(3, 'M');
    if (start.isValid()) {
      this.form.patchValue({'end': {
        date: {
          year: start.format('YYYY'),
          month: start.format('M'),
          day: start.format('D')
        }
      }});
    } else {
      this.form.patchValue({'end': ''});
    }
  }

  onDelete() {
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
    }).catch(() => {});
  }

  onSubmit() {
    const { value } = this.form;
    const person = {
      email: value.email,
      dateStart: this.getDate(value.start.date),
      dateEnd: this.getDate(value.end.date),
      courseId: +value.course
    };

    if (!this.person) {
      this.peopleService.addPerson(person)
        .subscribe((response) => {
          if (response.error) {
            swal('Oops...', response.error, 'error');
          }
        });
      this.form.reset();
      this.setDefaultDates();
    } else {
      const updatedPerson = Object.assign(person, {
        id: this.person.customerId,
        oldCourseId: this.person.courseId
      });
      this.peopleService.updatePerson(updatedPerson)
        .subscribe((response) => {
          if (response.error) {
            swal('Oops...', response.error, 'error');
          }
        });
    }
  }

  private getDate(value: any): string {
    const date = value.day + '.' + value.month + '.' + value.year;
    return moment(date, 'DD.M.YYYY').format('YYYY.MM.DD');
  }

}
