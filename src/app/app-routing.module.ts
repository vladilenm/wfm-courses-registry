import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { PeopleComponent } from './people/people.component';
import { CourseComponent } from './course/course.component';
import { PersonComponent } from './person/person.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth-guard.service';


const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'course/:id', component: CourseComponent, canActivate: [AuthGuard]},
  {path: 'person/:id', component: PersonComponent, canActivate: [AuthGuard]},
  {path: 'courses', component: CoursesComponent, canActivate: [AuthGuard]},
  {path: 'people', component: PeopleComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
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
