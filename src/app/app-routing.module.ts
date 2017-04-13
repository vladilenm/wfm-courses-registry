import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { PeopleComponent } from './people/people.component';
import { CourseComponent } from './course/course.component';
import { PersonComponent } from './person/person.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'course/:id', component: CourseComponent},
  {path: 'person/:id', component: PersonComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'people', component: PeopleComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
