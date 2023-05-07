import { Semester, SemesterTable } from './semesters.data';
import { Student, StudentTable } from './students.data';
import { Teacher, TeacherTable } from './teachers.data';

export interface Subject {
  id: number;
  neptun: string;
  name: string;
  credit: number;
  department: string;
  studentId: number[];
  students_s: Student[];
  teacherId: number[];
  teachers_s: Teacher[];
  semesterId: number[];
  semesters_s: Semester[];
  deleted: boolean;
}

export class SubjectTable {
  public static _subjects: Subject[] = [
    {
      id: 1,
      neptun: 'DDD444',
      name: 'Matek',
      credit: 3,
      department: 'Mathematics',
      studentId: [1, 3],
      students_s: [],
      teacherId: [3],
      teachers_s: [],
      semesterId: [1],
      semesters_s: [],
      deleted: false,
    },
    {
      id: 2,
      neptun: 'EEE555',
      name: 'Info',
      credit: 5,
      department: 'RSZT',
      studentId: [2],
      students_s: [],
      teacherId: [1, 3],
      teachers_s: [],
      semesterId: [2],
      semesters_s: [],
      deleted: false,
    },
    {
      id: 3,
      neptun: 'FFF666',
      name: 'Angol',
      credit: 4,
      department: 'VIRT',
      studentId: [3],
      students_s: [],
      teacherId: [2],
      teachers_s: [],
      semesterId: [1, 3],
      semesters_s: [],
      deleted: false,
    },
  ];

  public static subjects: Subject[] = SubjectTable._subjects.map((subject) => {
    subject.teacherId.forEach((x) => {
      if (TeacherTable != undefined) {
        const teacher = TeacherTable._teachers.find(
          (a) => a.id === subject.teacherId[x]
        );
        if (teacher != undefined) subject.teachers_s.push(teacher);
      }
    });
    subject.studentId.forEach((x) => {
      if (StudentTable != undefined) {
        const student = StudentTable._students.find(
          (a) => a.id === subject.studentId[x]
        );
        if (student != undefined) subject.students_s.push(student);
      }
    });

    subject.semesterId.forEach((x) => {
      const semester = SemesterTable._semester.find(
        (a) => a.id === subject.semesterId[x]
      );
      if (semester != undefined) subject.semesters_s.push(semester);
    });

    return subject;
  });
}
