import { Routes } from '@angular/router';
import { authGuard, authGuardLoggdIn } from './authentication/guard/auth.guard';
import { rolesGuard } from './authentication/guard/roles.guard';
import { LoginComponent } from './authentication/screens/login/login.component';
import { LayoutLeaderComponent } from './layouts/layout_leader/layout-leader.component';
import { DashboardComponent } from './pages/Leader/screens/dashboard/dashboard.component';
import { HOCDashboardComponent } from './HOC/hocdashboard/hocdashboard.component';
import { DashComponent } from './HOC/comp/dash/dash.component';
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
  //   title: 'التسجل | السالم',
  // },
  // {
  //   path: 'confirm-email',
  //   component: ConfirmEmailComponent,
  //   canActivate: [authGuardLoggdIn],
  //   title: 'التأكد من الايميل | السالم',
  // },

  // Stutent Pages
  {
    path: '',
    title: 'ICPC',
    canActivate: [rolesGuard],
    // component: LayStudentComponent,

    children: [],
  },

  // Admin Pages
  {
    path: 'leader',
    component: LayoutLeaderComponent,
    canActivate: [authGuard, rolesGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'camps',
        component: DashboardComponent,
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
