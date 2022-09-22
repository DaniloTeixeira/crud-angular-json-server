import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/Course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Output() edit = new EventEmitter<Course>();
  @Input() courses?: Course[];

  displayedColumns = ['id', 'name', 'category', 'actions'];

  onEdit(course: Course): void {
    this.edit.emit(course);
  }
}
