import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';
import { SimpleNotificationsModule } from 'angular2-notifications';


import { AppComponent } from './app.component';
import { CoursesListComponent } from './shared/components/courses-list/courses-list.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { PeopleComponent } from './people/people.component';
import { CourseComponent } from './course/course.component';
import { CoursePersonComponent } from './course/course-person/course-person.component';
import { CoursesService } from './shared/services/courses.service';
import { PeopleService } from './shared/services/people.service';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { CourseRowComponent } from './courses/course-row/course-row.component';
import { PersonComponent } from './person/person.component';
import { HttpService } from './shared/services/http.service';
import { PeopleFormComponent } from './shared/components/people-form/people-form.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { WFMDatePipe } from './shared/pipes/date.pipe';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    CoursesListComponent,
    CoursePersonComponent,
    HomeComponent,
    HeaderComponent,
    CoursesComponent,
    PeopleComponent,
    CourseComponent,
    FilterPipe,
    CourseRowComponent,
    PeopleFormComponent,
    PersonComponent,
    LoaderComponent,
    WFMDatePipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MyDatePickerModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [CoursesService, PeopleService, HttpService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
