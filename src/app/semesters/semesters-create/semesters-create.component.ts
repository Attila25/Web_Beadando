import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectNextSemesterId } from '../store/semesters.selectors';
import {
  SemesterActionTypes,
  semestersLoadedAction,
  semesterCreateAction,
} from '../store/semesters.actions';

@Component({
  selector: 'app-semesters-create',
  templateUrl: './semesters-create.component.html',
  styleUrls: ['./semesters-create.component.css'],
})
export class SemestersCreateComponent implements OnInit {
  semestersForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.semestersForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      start_date: [2023, [Validators.required]],
      end_date: [2024, [Validators.required]],
    });
  }

  onSubmit(semesterData: any) {
    semesterData.deleted = false;
    this.store.dispatch(semesterCreateAction(semesterData));
    this.semestersForm.reset();
    this.router.navigate(['/semesters']);
  }

  get name() {
    return this.semestersForm.get('name');
  }
  get startDate() {
    return this.semestersForm.get('startDate');
  }
  get endDate() {
    return this.semestersForm.get('endDate');
  }

  getNameErrorMessage() {
    if (this.name.dirty || this.name.touched) {
      if (this.name.hasError('minlength'))
        return 'You have to enter 9 characters!';
      if (this.name.hasError('maxlength'))
        return 'You have to enter 9 characters!';
    }
    return '';
  }

  getDescriptionErrorMessage() {
    if (this.startDate.dirty || this.startDate.touched) {
      if (this.startDate.hasError('required')) return 'You must enter a value!';
      if (this.startDate.hasError('maxlength'))
        return 'You can enter at most 100 characters!';
    }
    return '';
  }
}
