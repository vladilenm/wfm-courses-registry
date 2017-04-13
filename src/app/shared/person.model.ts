import { Boundary } from './date.model';

export class Person {
  constructor(public email: string, public date: Boundary, public courseId: number, public id?: number) {}
}
