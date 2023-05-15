import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TeachersService } from '../teachers.service';
import { selectLoadedTeacher } from '../store/teachers.selectors';
import {
  teachersRequestedAction,
  teacherRequestedAction,
} from '../store/teachers.actions';
import { TeacherModel } from '../store/teachers.model';
import { ActivatedRoute } from '@angular/router';
import {
  switchMap,
  catchError,
  map,
  startWith,
  debounceTime,
  retry,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-teachersubject-list',
  templateUrl: './teachersubject-list.component.html',
  styleUrls: ['./teachersubject-list.component.css'],
})
export class TeacherSubjectListComponent implements OnInit {
  teachers = [];
  teacher: any = {};

  constructor(
    private route: ActivatedRoute,
    private teachersService: TeachersService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((params) => this.teachersService.getTeacher(0)))
      .subscribe((teacher) => {
        this.teacher = teacher;
      });
  }
}
