import { Routes } from '@angular/router';
import { authGuard, authGuardLoggdIn } from './authentication/guard/auth.guard';
import { rolesGuard } from './authentication/guard/roles.guard';
import { LoginComponent } from './authentication/screens/login/login.component';
import { LayoutLeaderComponent } from './layouts/layout_leader/layout-leader.component';
import { DashboardComponent } from './pages/Leader/screens/dashboard/dashboard.component';

import { HOCDashboardComponent } from './HOC/hocdashboard/hocdashboard.component';
import { DashComponent } from './HOC/comp/dash/dash.component';

import { AddUserComponent } from './pages/Leader/screens/add-user/add-user.component';
import { CampsLeaderComponent } from './pages/Leader/screens/camps-leader/camps-leader.component';

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
        component: CampsLeaderComponent,
        title: 'Leader / Camps - ICPC',
      },
    ],
  },


  // Teacher and Data Entry Pages
  {
    path: 'instructor',
    // component: LayAdminComponent,
    canActivate: [authGuard, rolesGuard],
    children: [],
  },
  {
    path: 'hoc',
    component: HOCDashboardComponent,
    canActivate: [],
    title: 'HOC - Dashboard',
    children: [
      {
        path: 'dash',
        component: DashComponent,
      }
    ],
  }
  

];
