import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  SemesterActionTypes,
  semesterCreatedAction,
  semestersLoadedAction,
} from './semesters.actions';
import { SemestersService } from '../semesters.service';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextSemesterId } from './semesters.selectors';

@Injectable()
export class SemesterEffects {
  loadAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SemesterActionTypes.semestersRequested),
      mergeMap((action) => {
        return this.semestersService.getSemesters().pipe(
          map((semesters) => semestersLoadedAction({ semesters })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  createSemester$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SemesterActionTypes.semesterCreate),
      concatLatestFrom((action) => this.store.select(selectNextSemesterId)),
      switchMap(([action, id]) => {
        console.log(action, id);
        return this.semestersService.createSemester(action).pipe(
          map((item: any) => {
            return semesterCreatedAction({
              semester: {
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
    private semestersService: SemestersService,
    private store: Store
  ) {}
}
