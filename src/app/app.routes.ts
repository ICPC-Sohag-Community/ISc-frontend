import { Routes } from '@angular/router';
import { authGuard, authGuardLoggdIn } from './authentication/guard/auth.guard';
import { rolesGuard } from './authentication/guard/roles.guard';
import { LoginComponent } from './authentication/screens/login/login.component';
import { LayoutLeaderComponent } from './layouts/layout_leader/layout-leader.component';
import { DashboardComponent } from './pages/Leader/screens/dashboard/dashboard.component';
import { LayoutTraineeComponent } from './layouts/layout_trainee/layout-trainee.component';
import { HomeTraineeComponent } from './pages/Trainee/screens/home-trainee/home-trainee.component';

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
];
