import { Person } from './person.model';

export class PeopleService {
  private people: Person[] = [
    {
      email: 'email@mail.ru',
      course: 1,
      date: {
        start: 1323123123233,
        end: 12312324123421
      }
    },
    {
      email: 'email1@mail2.ru',
      course: 1,
      date: {
        start: 1323123321223,
        end: 1231232412211
      }
    },
    {
      email: 'email1@mail2.ru',
      course: 2,
      date: {
        start: 1323123321223,
        end: 1231232412211
      }
    },
    {
      email: 'email1@mail2.ru',
      course: 1,
      date: {
        start: 1323123321223,
        end: 1231232412211
      }
    },
    {
      email: 'email1@mail2.ru',
      course: 2,
      date: {
        start: 1323123321223,
        end: 1231232412211
      }
    }
  ];

  public getPeople(id: number): Person[] {
    return this.people.filter(person => person.course === id);
  }
}
