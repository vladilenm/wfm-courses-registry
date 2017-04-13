import { Person } from './person.model';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class PeopleService {
  private people: Person[] = [];

  constructor(private http: HttpService) {}

  public getPeople(id: number) {
    return this.http.getPeople({courseId: id});
  }

  public addPerson(person) {
    return this.http.createPerson(person);
  }

  // public getPerson(): Person {
  //   // return this.people.filter()
  // }
}
