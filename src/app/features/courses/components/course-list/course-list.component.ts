import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader';
import { SnackBarService } from 'src/app/shared/services/snackbar';
import { Course } from '../../models/Course';

import { CourseService } from '../../services';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Output() edit = new EventEmitter<Course>();
  @Input() courses?: Course[];
  @Input() loaded!: boolean;

  displayedColumns = ['id', 'name', 'category', 'actions'];

  constructor(
    private loader: LoaderService,
    private courseService: CourseService,
    private snackBarService: SnackBarService
  ) {}

  onEdit(course: Course): void {
    this.edit.emit(course);
  }

  deleteCourse(id: number): void {
    const msg = 'Apagando curso...';

    this.loader.show(msg);

    this.courseService
      .deleteCourse(id)
      .subscribe({
        next: () => {
          this.showSnackBarSuccess();
          location.reload();
        },
        error: () => this.showSnackBarError(),
      })
      .add(() => this.loader.hide());
  }

  private showSnackBarError(): void {
    const msg = 'Ops... Erro ao apagar curso.';

    this.snackBarService.showSnackBarError(msg);
  }

  private showSnackBarSuccess(): void {
    const msg = 'Curso Apagado com sucesso!';

    this.snackBarService.showSnackBarSuccess(msg);
  }
}
