import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMyDateModel, IMyOptions } from 'mydatepicker';
import * as moment from 'moment';
import {Course} from "../course.model";
import {CoursesService} from "../courses.service";
import {PeopleService} from "../people.service";

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

  constructor(
    private coursesService: CoursesService,
    private peopleService: PeopleService
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

  onSubmit() {
    const { value } = this.form;
    const person = {
      email: value.email,
      dateStart: this.getDate(value.start.date),
      dateEnd: this.getDate(value.end.date),
      courseId: +value.course
    };

    this.peopleService.addPerson(person)
      .subscribe((person) => {
        console.log('Success', person);
      });

    this.form.reset();
    this.setDefaultDates();
  }

  private getDate(value: any): string {
    const date = value.day + '.' + value.month + '.' + value.year;
    return moment(date, 'DD.M.YYYY').format('YYYY.MM.DD');
  }

}
