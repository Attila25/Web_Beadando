import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EventTable } from './event-list/events';
import { BookTable } from './data/books.data';
import { AuthorTable } from './data/authors.data';
import { TeacherTable } from './data/teachers.data';

@Injectable()
export class InMemoryEventService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const db = {
      events: EventTable.events,
      books: BookTable.books,
      authors: AuthorTable.authors,
      teachers: TeacherTable.teachers,
    };
    return db;
  }
}
