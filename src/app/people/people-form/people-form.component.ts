import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMyDateModel, IMyOptions } from 'mydatepicker';
import { Course } from '../../shared/course.model';
import { CoursesService } from '../../shared/courses.service';
import * as moment from 'moment';
import { Person } from '../../shared/person.model';
import { PeopleService } from '../../shared/people.service';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.css']
})
export class PeopleFormComponent implements OnInit {
  private form: FormGroup;
  private courses: Course[];
  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd.mm.yyyy',
  };
  private format = 'DD.MM.YYYY';

  constructor(private coursesService: CoursesService, private peopleService: PeopleService) { }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'start': new FormControl('', Validators.required),
      'end': new FormControl('', Validators.required),
      'course': new FormControl(null, Validators.required),
    });

    this.setDefaultDates();
  }

  setDefaultDates() {
    const start = moment();
    const end = moment().add(3, 'M');
    this.form.patchValue(
      {
        'start': {
          date: {
            year: start.format('YYYY'),
            month: start.format('M'),
            day: start.format('D')
          }
        },
        'end': {
          date: {
            year: end.format('YYYY'),
            month: end.format('M'),
            day: end.format('D')
          }
        }
      });
  }

  onStartChanged(event: IMyDateModel) {
    const start = moment(event.formatted, this.format).add(3, 'M');
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

  onSubmit() {
    const { value } = this.form;
    const person: Person = {
      email: value.email,
      date: {
        start: this.getDate(value.start.date),
        end: this.getDate(value.end.date)
      },
      course: +value.course
    };
    this.peopleService.addPerson(person);
    this.form.reset();
    this.setDefaultDates();
  }

  private getDate(value: any): string {
    const date = value.day + '.' + value.month + '.' + value.year;
    return moment(date, 'DD.M.YYYY').format(this.format);
  }

}
