import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { RequestService } from '../../app/request.service';
import { Teacher } from '../../app/data/teachers.data';
import { TeacherModel } from './store/teachers.model';

const TEACHER_URL = 'api/teachers';

@Injectable()
export class TeachersService {
  constructor(private requestService: RequestService, private store: Store) {}

  getTeachers(): Observable<TeacherModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<TeacherModel[]>(TEACHER_URL, httpOptions);
  }

  createTeacher(teacher: TeacherModel): Observable<any> {
    return this.requestService.post(`${TEACHER_URL}/`, teacher);
  }
}
