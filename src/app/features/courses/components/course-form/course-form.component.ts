import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader';
import { SnackBarService } from 'src/app/shared/services/snackbar';

import { Course } from '../../models/Course';
import { EditCoursePayload } from '../../models/EditCoursePayload';
import { CourseService } from '../../services';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form?: FormGroup<{
    name: FormControl<string>;
    category: FormControl<string>;
  }>;

  courseId!: string;
  course?: Course;
  courses?: Course[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private fb: NonNullableFormBuilder,
    private courseService: CourseService,
    private snackBarService: SnackBarService
  ) {}

  get mode(): string {
    this.getCourses();
    return this.courseId ? 'update' : 'create';
  }

  get newCourseId(): number {
    return this.courses!.length + 1;
  }

  ngOnInit(): void {
    this.buildForm();
    this.loadParams();
    this.getCourses();

    if (this.courseId) {
      this.getCourseById();
    }
  }

  onBack(): void {
    this.router.navigate(['cursos']);
  }

  onSubmit(): void {
    if (this.mode === 'create') {
      this.saveCourse();
      return;
    }
    this.updateCourse();
  }

  private saveCourse(): void {
    const msg = 'Salvando curso...';
    const payload = this.getCoursePayload();

    this.loader.show(msg);

    this.courseService
      .saveCourse(payload)
      .subscribe({
        next: () => {
          this.showSnackBarSuccess();
          this.onBack();
        },
        error: () => this.showSnackBarError(),
      })
      .add(() => this.loader.hide());
  }

  private updateCourse(): void {
    const msg = 'Atualizando curso...';
    const payload = this.getEditCoursePayload();

    this.loader.show(msg);

    this.courseService
      .editCourse(payload, this.courseId)
      .subscribe({
        next: () => {
          this.showSnackBarSuccess();
          this.onBack();
        },
        error: () => this.showSnackBarError(),
      })
      .add(() => this.loader.hide());
  }

  private showSnackBarError(): void {
    const msg = 'Ops... Erro ao salvar curso.';

    this.snackBarService.showSnackBarError(msg);
  }

  private showSnackBarSuccess(): void {
    const msg = 'Curso salvo com sucesso!';

    this.snackBarService.showSnackBarSuccess(msg);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: this.fb.control('', Validators.required),
      category: this.fb.control('', Validators.required),
    });
  }

  private getCoursePayload(): Course {
    const form = this.form?.getRawValue();

    return {
      id: this.newCourseId,
      name: form!.name,
      category: form!.category,
    };
  }

  private getEditCoursePayload(): EditCoursePayload {
    const form = this.form?.getRawValue();

    return {
      name: form!.name,
      category: form!.category,
    };
  }

  private getCourseById(): void {
    this.courseService.getCourseById(this.courseId).subscribe((course) => {
      this.course = course;

      if (course) {
        this.fillForm();
      }
    });
  }

  private getCourses(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  private fillForm(): void {
    this.form?.patchValue({
      name: this.course!.name,
      category: this.course!.category,
    });
  }

  private loadParams(): void {
    this.route.params.pipe(take(1)).subscribe(({ id }) => {
      this.courseId = id;
    });
  }

  private resetForm(): void {
    this.form?.reset();
  }
}
