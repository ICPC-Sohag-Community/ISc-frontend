import { Routes } from '@angular/router';
import { authGuard, authGuardLoggdIn } from './authentication/guard/auth.guard';
import { rolesGuard } from './authentication/guard/roles.guard';
import { LoginComponent } from './authentication/screens/login/login.component';
import { LayoutLeaderComponent } from './layouts/layout_leader/layout-leader.component';
import { DashboardComponent } from './pages/Leader/screens/dashboard/dashboard.component';
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
import { TasksComponent } from './pages/mentor/tasks/tasks.component';
import { PracticeComponent } from './pages/mentor/practice/practice.component';

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


  // Teacher and Data Entry Pages
  {
    path: 'instructor',
    // component: LayAdminComponent,
    canActivate: [authGuard, rolesGuard],
    children: [],
  },
  {
    path: 'head-of-camp',
    component: HocLayoutComponent,
    canActivate: [authGuard,rolesGuard],
    title: 'HOC - Dashboard',
    children: [
      {
        path: '',
        component: DashComponent,
        title: 'head of camp - Dashboard',
      }
     
    ],
  },
  {
    path: 'mentor',
    component: MentorLayoutComponent,
    canActivate: [authGuard,rolesGuard],
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
      {
        path: 'tasks',
        component: TasksComponent,
        title: 'mentor / Tasks - ICPC',
      },
      {
        path: 'practice',
        component: PracticeComponent,
        title: 'mentor / Practice - ICPC',
      }
     
    ],
  }
  

];
