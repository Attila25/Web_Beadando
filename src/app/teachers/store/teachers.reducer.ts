import { createReducer, on, Action } from '@ngrx/store';
import { teacherCreateAction, teachersLoadedAction } from './teachers.actions';
import { TeacherModel } from './teachers.model';

export const teachersFeatureKey = 'teachersFeature';

export interface TeachersFeatureState {
  teachers: Array<TeacherModel>;
}

export const initialState: TeachersFeatureState = {
  teachers: [],
};

export const teachersReducer = createReducer(
  initialState,
  on(teachersLoadedAction, (state, { teachers }) => ({ ...state, teachers })),
  on(teacherCreateAction, (state) => ({ ...state }))
);
