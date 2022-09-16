import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, take } from 'rxjs';

import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly url = '/assets/courses.json';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url).pipe(delay(2000), take(1));
  }
}
