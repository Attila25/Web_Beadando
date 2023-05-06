import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextTeacherId } from './teachers.selectors';
import { TeacherModel } from './teachers.model';
import { teachersLoadedAction } from './teachers.actions';

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

  constructor(
    private actions$: Actions,
    private teachersService: TeachersService,
    private store: Store
  ) {}
}
