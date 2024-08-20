import { Routes } from '@angular/router';
import { authGuard, authGuardLoggdIn } from './authentication/guard/auth.guard';
import { rolesGuard } from './authentication/guard/roles.guard';
import { LoginComponent } from './authentication/screens/login/login.component';
import { LayoutLeaderComponent } from './layouts/layout_leader/layout-leader.component';
import { DashboardComponent } from './pages/Leader/screens/dashboard/dashboard.component';
import { LayoutTraineeComponent } from './layouts/layout_trainee/layout-trainee.component';
import { HomeTraineeComponent } from './pages/Trainee/screens/home-trainee/home-trainee.component';

import { HOCDashboardComponent } from './HOC/hocdashboard/hocdashboard.component';
import { DashComponent } from './HOC/comp/dash/dash.component';

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
    path: 'trainee',
    title: 'ICPC',
    canActivate: [rolesGuard],
    component: LayoutTraineeComponent,

    children: [
      {
        path:'home',
        component:HomeTraineeComponent
      }
    ],
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
