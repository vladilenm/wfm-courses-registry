import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PeopleService } from '../shared/people.service';
import { Person } from '../shared/person.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  private people: Person[];
  private peopleSearch: string = '';

  constructor(private route: ActivatedRoute, private peopleService: PeopleService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.people = this.peopleService.getPeople(+params['id']);
      }
    );
  }

}
