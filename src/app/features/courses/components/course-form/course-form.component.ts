import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services';

import { Course } from '../../models/Course';
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

  courseId!: number;
  course?: Course;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder,
    private courseService: CourseService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadParams();
    this.getCourseById();
  }

  onBack(): void {
    this.router.navigate(['cursos']);
  }

  onSubmit(): void {
    this.saveCourse();
  }

  private saveCourse(): void {
    const payload = this.getCoursePayload();

    this.courseService.saveCourse(payload).subscribe({
      next: () => this.showSnackBarSuccess(),
      error: () => this.showSnackBarError(),
    });
  }

  private showSnackBarError(): void {
    const msg = 'Ops... Erro ao salvar curso.';

    this.snackBarService.showSnackBarSuccess(msg);
  }

  private showSnackBarSuccess(): void {
    const msg = 'Curso salvo com sucesso! :)';

    this.snackBarService.showSnackBarSuccess(msg);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: this.fb.control(''),
      category: this.fb.control(''),
    });
  }

  private getCoursePayload(): Course {
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
}
