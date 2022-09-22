import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { catchError, of } from 'rxjs';

import { Course } from '../../models/Course';

import { CourseService } from '../../services';

import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  loaded = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  onAdd(): void {
    this.router.navigate(['criar-curso'], {
      relativeTo: this.route,
    });
  }

  editCourse(course: Course): void {
    this.router.navigate(['editar', course.id], { relativeTo: this.route });
  }

  private getCourses(): void {
    this.courseService
      .getCourses()
      .pipe(
        catchError(() => {
          this.onError('Nenhum curso encontrado.');
          return of([]);
        })
      )
      .subscribe((courses) => {
        this.courses = courses;
        this.loaded = true;
      });
  }

  private onError(errorMsg: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
