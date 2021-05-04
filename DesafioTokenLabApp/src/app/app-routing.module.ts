import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsGuardGuard } from './auth/events-guard.guard';
import { LoginComponent } from './auth/login/login.component';
import { EventPageComponent } from './core/event-page/event-page.component';
import { NewEventComponent } from './core/new-event/new-event.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'events' },
  { path: 'login', component: LoginComponent },
  { path: 'events', component: EventPageComponent, canActivate: [EventsGuardGuard] },
  { path: 'events/new', component: NewEventComponent, canActivate: [EventsGuardGuard]  },
  { path: 'events/edit/:id', component: NewEventComponent, canActivate: [EventsGuardGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
