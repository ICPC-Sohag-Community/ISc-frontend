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
import { MentornavComponent } from './layouts/mentor/mentornav/mentornav.component';
import { MentorLayoutComponent } from './layouts/mentor/mentor-layout/mentor-layout.component';
import { TraineesComponent } from './pages/mentor/trainees/trainees.component';
import { AttendanceComponent } from './pages/mentor/attendance/attendance.component';
import { StandingsComponent } from './pages/mentor/standings/standings.component';
import { TrackingComponent } from './pages/mentor/tracking/tracking.component';

import { CampsLeaderComponent } from './pages/Leader/screens/camps-leader/camps-leader.component';
import { ActiosCampComponent } from './pages/Leader/screens/actios-camp/actios-camp.component';
import { StandingCampComponent } from './pages/Leader/screens/standing-camp/standing-camp.component';
import { StaffLeaderComponent } from './pages/Leader/screens/staff-leader/staff-leader.component';
import { TraineesLeaderComponent } from './pages/Leader/screens/trainees-leader/trainees-leader.component';
import { ArchiveLeaderComponent } from './pages/Leader/screens/archive-leader/archive-leader.component';
import { SheetsTraineeComponent } from './pages/Trainee/screens/sheets-trainee/sheets-trainee.component';
import { ContestTraineeComponent } from './pages/Trainee/screens/contest-trainee/contest-trainee.component';
import { StandingTraineeComponent } from './pages/Trainee/screens/standing-trainee/standing-trainee.component';

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
        path: 'home',
        component: HomeTraineeComponent,
        title: 'Trainee / Home - ICPC',
      },
      {
        path: 'sheets',
        component: SheetsTraineeComponent,
        title: 'Trainee / Sheets - ICPC',
      },
      {
        path: 'contests',
        component: ContestTraineeComponent,
        title: 'Trainee / contests - ICPC',
      },
      {
        path: 'standing',
        component: StandingTraineeComponent,
        title: 'Trainee / standing - ICPC',
      },
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
      {
        path: 'trainees',
        component: TraineesLeaderComponent,
        title: 'Leader / Trainees - ICPC',
      },
      {
        path: 'archive',
        component: ArchiveLeaderComponent,
        title: 'Leader / Archive - ICPC',
      },
    ],
  },

  {
    path: 'head-of-camp',
    component: HocLayoutComponent,
    canActivate: [authGuard, rolesGuard],
    title: 'HOC - Dashboard',
    children: [
      {
        path: '',
        component: DashComponent,
        title: 'head of camp - Dashboard',
      },
    ],
  },

  // mentor Page
  {
    path: 'mentor',
    component: MentorLayoutComponent,
    canActivate: [authGuard, rolesGuard],
    title: 'Mentor',
    children: [
      {
        path: '',
        component: TraineesComponent,
        title: 'mentor / Trainees - ICPC',
      },
      {
        path: 'attendance',
        component: AttendanceComponent,
        title: 'mentor / Attendance - ICPC',
      },
      {
        path: 'standings',
        component: StandingsComponent,
        title: 'mentor / Standings - ICPC',
      },
      {
        path: 'tracking',
        component: TrackingComponent,
        title: 'mentor / Tracking - ICPC',
      },
    ],
  },
];
