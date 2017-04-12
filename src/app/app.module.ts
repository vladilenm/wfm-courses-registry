import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CoursesListComponent } from './shared/courses-list/courses-list.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { PeopleComponent } from './people/people.component';
import { CourseComponent } from './course/course.component';
import { CoursePersonComponent } from './course/course-person/course-person.component';
import { CoursesService } from './shared/courses.service';
import { PeopleService } from './shared/people.service';
import { FilterPipe } from './shared/filter.pipe';
import { CourseRowComponent } from './courses/course-row/course-row.component';

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
    CourseRowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [CoursesService, PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
