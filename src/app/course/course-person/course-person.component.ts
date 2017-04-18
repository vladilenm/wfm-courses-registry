import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../../shared/models/person.model';

@Component({
  selector: '[app-course-person]',
  templateUrl: './course-person.component.html',
  styleUrls: ['./course-person.component.css']
})
export class CoursePersonComponent implements OnInit {

  @Input() person: Person;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
