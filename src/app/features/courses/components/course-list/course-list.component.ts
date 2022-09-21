import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog';
import { Course } from '../../models/Course';
import { CourseService } from '../../services';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  displayedColumns = ['id', 'name', 'category', 'actions'];

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  private getCourses(): void {
    this.courseService
      .getCourses()
      .pipe(
        catchError((e) => {
          this.onError('Nenhum curso encontrado.');
          return of([]);
        })
      )
      .subscribe((courses) => {
        this.courses = courses;
      });
  }

  private onError(errorMsg: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
