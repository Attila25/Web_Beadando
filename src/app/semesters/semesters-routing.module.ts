import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../app/auth/auth.guard';
import { SemestersListComponent } from './semesters-list/semesters-list.component';
import { SemestersComponent } from './semesters/semesters.component';

const routes: Routes = [
  {
    path: '',
    component: SemestersComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: SemestersListComponent,
          },
          /*{
          path: 'details/:eventId',
          component: EventDetailsComponent
        },*/
        ],
      },
    ],
  },
  { path: '', redirectTo: '/semesters', pathMatch: 'full' },
  { path: '**', component: SemestersListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemestersRoutingModule {}
