import { Subject } from '../../data/subjects.data';
import { Teacher, Position } from '../../data/teachers.data';

export class TeacherModel implements Teacher {
  id!: number;
  neptun!: string;
  name!: string;
  email!: string;
  position!: Position;
  subjectId!: number[];
  subjects!: Subject[];
  deleted!: boolean;
}
