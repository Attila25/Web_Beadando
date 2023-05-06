import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeachersComponent } from './teachers/teachers.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: TeachersListComponent,
          },
          /*{
          path: 'details/:eventId',
          component: EventDetailsComponent
        },*/
        ],
      },
    ],
  },
  { path: '', redirectTo: '/teachers', pathMatch: 'full' },
  { path: '**', component: TeachersListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}
