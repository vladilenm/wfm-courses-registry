import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PeopleService } from '../shared/people.service';
import * as moment from 'moment';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  private people = [];
  private peopleSearch = '';
  private isLoading = true;

  constructor(private route: ActivatedRoute, private peopleService: PeopleService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.peopleService.getPeople(+params['id'])
          .subscribe((people) => {
            this.isLoading = false;
            this.people = people;
          });
      }
    );
  }

  getClasses(person) {
    const now = moment();
    const end = moment(person.dateEnd, 'YYYY.MM.DD');

    return {
      'success': end.isAfter(now),
      'danger': end.isBefore(now)
    };
  }
}
