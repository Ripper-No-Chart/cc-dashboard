import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionsComponent } from './components/sessions/sessions.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'tracking',
    component: TrackingComponent,
  },
  {
    path: 'sessions',
    component: SessionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
