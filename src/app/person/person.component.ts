import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PeopleService } from '../shared/people.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(private route: ActivatedRoute, private peopleService: PeopleService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        this.peopleService.getPerson(id);
      }
    );
  }

}
