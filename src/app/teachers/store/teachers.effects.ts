import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  TeacherActionTypes,
  teacherCreatedAction,
  teacherLoadedAction,
  teachersLoadedAction,
} from './teachers.actions';
import { TeachersService } from '../teachers.service';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextTeacherId } from './teachers.selectors';

@Injectable()
export class TeacherEffects {
  loadTeachers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherActionTypes.teachersRequested),
      mergeMap((action) => {
        return this.teachersService.getTeachers().pipe(
          map((teachers) => teachersLoadedAction({ teachers })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  loadTeacher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherActionTypes.teacherRequested),
      switchMap((action) =>
        this.teachersService.getTeacher(action.teacherId).pipe(
          map((teacher) => teacherLoadedAction({ teacher })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  createTeacher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherActionTypes.teacherCreate),
      concatLatestFrom((action) => this.store.select(selectNextTeacherId)),
      switchMap(([action, id]) => {
        console.log(action, id);
        return this.teachersService.createTeacher(action).pipe(
          map((item: any) => {
            return teacherCreatedAction({
              teacher: {
                id: action.id,
                neptun: action.neptun,
                name: action.name,
                email: action.email,
                position: action.position,
                subjectId: action.subjectId,
                subjects: [],
                deleted: false,
              },
            });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private teachersService: TeachersService,
    private store: Store
  ) {}
}
