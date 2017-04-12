import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { PeopleComponent } from './people/people.component';
import { CoursesAddComponent } from './courses/courses-add/courses-add.component';
import { CourseComponent } from './course/course.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'course/:id', component: CourseComponent},
  {path: 'courses', component: CoursesComponent, children: [
    {path: 'add', component: CoursesAddComponent},
  ]},
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
