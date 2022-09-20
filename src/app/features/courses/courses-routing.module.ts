import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseFormComponent } from './components/course-form';
import { CoursesComponent } from './components/courses';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'criar-curso', component: CourseFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
