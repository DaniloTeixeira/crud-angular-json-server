import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './../../shared/app-material/app-material.module';
import { SharedModule } from './../../shared/shared.module';
import { CourseFormComponent } from './components/course-form';
import { CoursesComponent } from './components/courses';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseListComponent } from './components/course-list';

@NgModule({
  declarations: [CoursesComponent, CourseFormComponent, CourseListComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class CoursesModule {}
