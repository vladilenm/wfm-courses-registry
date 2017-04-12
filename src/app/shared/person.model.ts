import { Boundary } from './date.model';

export class Person {
  constructor(public email: string, public date: Boundary, public course: number, public id?: number) {}
}
