import { Person } from '../models/person.model';
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

  public updatePerson(person) {
    return this.http.updatePerson(person);
  }

  public deletePerson(id) {
    return this.http.deletePerson({id});
  }

  public getPersonById(id) {
    return this.http.getPersonById({id});
  }

  public getPersonCourses(email) {
    return this.http.getPersonCourses({email});
  }
}
