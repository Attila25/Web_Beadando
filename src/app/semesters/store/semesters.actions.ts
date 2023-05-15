import { createAction, props } from '@ngrx/store';
import { SemesterModel } from './teachers.model';

export enum SemesterActionTypes {
  teachersRequested = '[Semesters] Semesters Requested',
  teachersLoaded = '[Semesters] Semesters Loaded',
  teacherCreate = '[Semesters] Semester Create',
  teacherCreated = '[Semesters] Semester Created',
}

export const teachersRequestedAction = createAction(
  SemesterActionTypes.teachersRequested
);
export const teachersLoadedAction = createAction(
  SemesterActionTypes.teachersLoaded,
  props<{ teachers: SemesterModel[] }>()
);
export const teacherCreateAction = createAction(
  SemesterActionTypes.teacherCreate,
  props<{ teacher: SemesterModel }>()
);
export const teacherCreatedAction = createAction(
  SemesterActionTypes.teacherCreated,
  props<{ teacher: SemesterModel }>()
);
