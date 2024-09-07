import { Routes } from '@angular/router';
import { authGuard, authGuardLoggdIn } from './authentication/guard/auth.guard';
import { rolesGuard } from './authentication/guard/roles.guard';
// import { LoginComponent } from './authentication/screens/login/login.component';
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
import { TasksComponent } from './pages/mentor/tasks/tasks.component';
import { PracticeComponent } from './pages/mentor/practice/practice.component';

import { CampsLeaderComponent } from './pages/Leader/screens/camps-leader/camps-leader.component';
import { ActiosCampComponent } from './pages/Leader/screens/actios-camp/actios-camp.component';
import { StandingCampComponent } from './pages/Leader/screens/standing-camp/standing-camp.component';
import { StaffLeaderComponent } from './pages/Leader/screens/staff-leader/staff-leader.component';
import { TraineesLeaderComponent } from './pages/Leader/screens/trainees-leader/trainees-leader.component';
import { ArchiveLeaderComponent } from './pages/Leader/screens/archive-leader/archive-leader.component';
import { SheetsTraineeComponent } from './pages/Trainee/screens/sheets-trainee/sheets-trainee.component';
import { ContestTraineeComponent } from './pages/Trainee/screens/contest-trainee/contest-trainee.component';
import { LoginLayoutComponent } from './layouts/login/login-layout/login-layout.component';



import { ReportsLeaderComponent } from './pages/Leader/screens/reports-leader/reports-leader.component';
import { RequestsLeaderComponent } from './pages/Leader/screens/requests-leader/requests-leader.component';

import { StandingTraineeComponent } from './pages/Trainee/screens/standing-trainee/standing-trainee.component';
import { OtpComponent } from './authentication/screens/login/otp/otp.component';
import { SetpassComponent } from './authentication/screens/login/setpass/setpass.component';
import { ForgetComponent } from './authentication/screens/login/forget/forget.component';
import { LogComponent } from './authentication/screens/login/log/log.component';


export const routes: Routes = [
  // Auth Pages
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   canActivate: [authGuardLoggdIn],
  //   title: 'Login - ICPC',
  // },
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
        path: 'reports',
        component: ReportsLeaderComponent,
        title: 'Leader / reports - ICPC',
      },
      {
        path: 'requests',
        component: RequestsLeaderComponent,
        title: 'Leader / requests - ICPC',
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
  ,{
    path: 'login',
    component: LoginLayoutComponent,
    canActivate: [authGuardLoggdIn],
    title: 'Login',
    children: [
      {
        path: '',
        component: LogComponent,
        title: 'Login',
      },
      {
        path: 'forget',
        component: ForgetComponent,
        title: 'Forget Password',
      },
      {
        path: 'set/:token/:email',
        component: SetpassComponent,
        title: 'Reset Password',
      }
     
    ],
  },
  {
    path: 'otp/:email',
    component: OtpComponent,
    canActivate: [authGuardLoggdIn],
    title: 'OTP',
    children: [
      
    ],
  }
]

