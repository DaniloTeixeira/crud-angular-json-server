import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, take } from 'rxjs';

import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly url = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url).pipe(delay(2000), take(1));
  }

  saveCourse(payload: Course): Observable<void> {
    return this.http.post<void>(this.url, { body: payload }).pipe(take(1));
  }
}
