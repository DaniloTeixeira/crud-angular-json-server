import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, take } from 'rxjs';

import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly baseURL = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseURL).pipe(delay(2000), take(1));
  }

  getCourseById(id: number): Observable<Course> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<Course>(url).pipe(take(1));
  }

  saveCourse(payload: Course): Observable<void> {
    return this.http.post<void>(this.baseURL, payload).pipe(take(1));
  }

  // editCourse(id: number): Observable<void> {
  //   const url = `${this.baseURL}/${id}`;

  //   return this.http.put<void>(url).pipe(take(1));
  // }
}
