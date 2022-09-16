import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { CourseService } from '../../services';
import { ErrorDialogComponent } from './../../../../shared/components/error-dialog/error-dialog.component';
import { Course } from './../../models/Course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$?: Observable<Course[]>;

  displayedColumns = ['id', 'name', 'category'];

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  private onError(errorMsg: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  private getCourses(): void {
    this.courses$ = this.courseService.getCourses().pipe(
      catchError((e) => {
        this.onError('Nenhum curso encontrado.');
        return of([]);
      })
    );
  }
}
