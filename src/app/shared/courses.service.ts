import { Course } from './course.model';

export class CoursesService {
  courses: Course[] = [
    {
      id: 1,
      name: 'Курс 1'
    },
    {
      id: 2,
      name: 'Курс 2'
    },
    {
      id: 3,
      name: 'Курс 3'
    },
    {
      id: 4,
      name: 'Курс 4'
    },
    {
      id: 5,
      name: 'Курс 5'
    },
    {
      id: 6,
      name: 'Курс 6'
    }
  ];

  public getCourses(): Course[] {
    return this.courses;
  }

  public updateCourse(id: number, name: string): void {
    this.courses.find(c => c.id === id).name = name;
  }

  public addCourse(course: Course): void {
    this.courses.push(course);
  }

  public deleteCourse(id: number): Course[] {
    return this.courses = this.courses.filter(c => c.id !== id);
  }
}
