import { Component, OnInit } from '@angular/core';

import { Course } from './../../models/Course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [
    { id: '1', name: 'Angular', category: 'Front-end' },
    { id: '2', name: 'HTML', category: 'Front-end' },
    { id: '3', name: 'Java', category: 'Back-end' },
  ];

  displayedColumns = ['id', 'name', 'category'];

  constructor() {}

  ngOnInit(): void {}
}
