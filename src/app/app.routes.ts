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

import { HocLayoutComponent } from './layouts/HOC/hoc-layout/hoc-layout.component';

import { CampsLeaderComponent } from './pages/Leader/screens/camps-leader/camps-leader.component';
import { ActiosCampComponent } from './pages/Leader/screens/actios-camp/actios-camp.component';
import { StandingCampComponent } from './pages/Leader/screens/standing-camp/standing-camp.component';
import { StaffLeaderComponent } from './pages/Leader/screens/staff-leader/staff-leader.component';
import { SheetsTraineeComponent } from './pages/Trainee/screens/sheets-trainee/sheets-trainee.component';


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

  // Trainee Pages
  {
    path: 'trainee',
    title: 'ICPC',
    canActivate: [rolesGuard],
    component: LayoutTraineeComponent,

    children: [
      {
        path: '',
        component: HomeTraineeComponent,
        title: 'Trainee / Home - ICPC',
      },
      {
        path:'home',
        component:HomeTraineeComponent,
        title: 'Trainee / Home - ICPC'
      },
      {
        path:'sheets',
        component:SheetsTraineeComponent,
        title:'Trainee / Sheets - ICPC'
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
        component: CampsLeaderComponent,
        title: 'Leader / Camps - ICPC',
      },
      {
        path: 'camps',
        children: [
          {
            path: 'action-camp/:id',
            component: ActiosCampComponent,
            title: 'Leader / Camps / action-camp - ICPC',
          },
        ],
      },
      {
        path: 'camps',
        children: [
          {
            path: 'standing/:id',
            component: StandingCampComponent,
            title: 'Leader / Camps / standing - ICPC',
          },
        ],
      },
      {
        path: 'staff',
        component: StaffLeaderComponent,
        title: 'Leader / staff - ICPC',
      },
    ],
  },

  // {

  //   path: 'head-of-camp',
  //   component: HocLayoutComponent,
  //   canActivate: [authGuard],

  //   path: 'head_of_camp',
  //   component: HOCDashboardComponent,
  //   canActivate: [authGuard, rolesGuard],

  //   title: 'HOC - Dashboard',
  //   children: [
  //     {
  //       path: '',
  //       component: DashComponent,

  //       title: 'HOC / Dashboard - ICPC',
  //     }


  //   ]
  // }
]
