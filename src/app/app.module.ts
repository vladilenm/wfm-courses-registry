import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesTableComponent } from './courses-table/courses-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesListComponent,
    CoursesTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
