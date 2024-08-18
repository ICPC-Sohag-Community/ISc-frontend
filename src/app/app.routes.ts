import { Routes } from '@angular/router';
import { authGuard, authGuardLoggdIn } from './authentication/guard/auth.guard';
import { rolesGuard } from './authentication/guard/roles.guard';
import { LoginComponent } from './authentication/screens/login/login.component';
import { LayoutLeaderComponent } from './layouts/layout_leader/layout-leader.component';
import { DashboardComponent } from './pages/Leader/screens/dashboard/dashboard.component';
import { AddUserComponent } from './pages/Leader/screens/add-user/add-user.component';

export const routes: Routes = [
  // Auth Pages
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuardLoggdIn],
    title: 'Login - ICPC',
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  //   canActivate: [authGuardLoggdIn],
  // },
  // {
  //   path: 'confirm-email',
  //   component: ConfirmEmailComponent,
  //   canActivate: [authGuardLoggdIn],
  // },

  // Stutent Pages
  {
    path: '',
    title: 'ICPC',
    canActivate: [rolesGuard],
    // component: LayStudentComponent,

    children: [],
  },

  // Leader Routes
  {
    path: 'leader',
    component: LayoutLeaderComponent,
    canActivate: [authGuard, rolesGuard],
    title: 'Leader - ICPC',
    children: [
      {
        path: '',
        component: DashboardComponent,
        title: 'Leader / Dashboard - ICPC',
      },
      {
        path: 'add-user',
        component: AddUserComponent,
        title: 'Leader / add new user - ICPC',
      },
      {
        path: 'camps',
        component: DashboardComponent,
        title: 'Leader / Camps - ICPC',
      },
    ],
  },
];
