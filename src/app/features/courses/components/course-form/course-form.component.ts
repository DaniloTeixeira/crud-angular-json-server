import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onBack(): void {
    this.router.navigate(['cursos']);
  }
}
