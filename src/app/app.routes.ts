import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { UserDetailsComponent } from './Components/user-details/user-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user/:id', component: UserDetailsComponent}
];
