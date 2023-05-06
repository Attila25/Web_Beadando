import { createAction, props } from '@ngrx/store';
import { TeacherModel } from './teachers.model';

export enum TeacherActionTypes {
  teachersRequested = '[Teachers] Teachers Requested',
  teachersLoaded = '[Teachers] Teachers Loaded',
  teacherCreate = '[Teachers] Teacher Create',
  teacherCreated = '[Teachers] Teacher Created',
}

export const teachersRequestedAction = createAction(
  TeacherActionTypes.teachersRequested
);
export const teachersLoadedAction = createAction(
  TeacherActionTypes.teachersLoaded,
  props<{ teachers: TeacherModel[] }>()
);
export const teacherCreateAction = createAction(
  TeacherActionTypes.teacherCreate,
  props<{ teacher: TeacherModel }>()
);
export const teacherCreatedAction = createAction(
  TeacherActionTypes.teacherCreated,
  props<{ subject: TeacherModel }>()
);
