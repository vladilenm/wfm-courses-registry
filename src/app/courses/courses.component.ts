import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../shared/courses.service';
import { Course } from '../shared/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  private form: FormGroup;
  private courses: Course[] = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {

    this.coursesService.getCourses()
      .subscribe((courses: Course[]) => {
        this.courses = courses;
      });

    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.coursesService.addCourse({
      name: this.form.get('name').value
    }).subscribe((course: Course) => this.courses.push(course));
    this.form.reset();
  }

  onDelete(id: number) {
    const courseName = this.courses.filter(c => c.id === id)[0].name;
    const shouldDelete = confirm(`Вы уверены, что хотите удалить курс ${courseName}`);
    if (shouldDelete) {
      this.coursesService.deleteCourse(id)
        .subscribe(({id}) => {
          this.courses = this.courses.filter(c => c.id !== id);
        });
    }
  }

}
