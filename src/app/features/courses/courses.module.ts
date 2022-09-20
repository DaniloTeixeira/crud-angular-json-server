import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './../../shared/app-material/app-material.module';
import { SharedModule } from './../../shared/shared.module';
import { CourseFormComponent } from './components/course-form';
import { CoursesComponent } from './components/courses';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [CoursesComponent, CourseFormComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    SharedModule,
  ],
})
export class CoursesModule {}
