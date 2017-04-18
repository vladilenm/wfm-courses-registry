import { Person } from './person.model';

export class Course {
  constructor(public id: number, public name: string, people?: Person[]) {}
}
