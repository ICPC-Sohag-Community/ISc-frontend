import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const rolesGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userInfo = JSON.parse(localStorage.getItem('CURRENT_USER') || '{}');
  const { routeConfig } = route;
  const authService = inject(AuthService);
  /// اللي رايحله
  const { path } = routeConfig as Route;
  if (path === '' && !authService.isAuth()) {
    return true;
  }
  // if (path === '' && roleDto.roleName === 'طالب') {
  //   return true;
  // }
  if (path === 'leader' && userInfo.roles[0] === 'Leader') {
    return true;
  }
  if (path === 'mentor' && userInfo.roles[0] === 'Mentor') {
    return true;
  }
  if (path === 'head_Of_Camp' && userInfo.roles[0] === 'Head_Of_Camp') {
    return true;
  }
  if (path === 'trainee' && userInfo.roles[0] === 'Trainee') {
    return true;
  }

  router.navigateByUrl(
    userInfo.roles[0] === 'Leader'
      ? '/leader'
      : userInfo.roles[0] === 'Mentor'
      ? '/mentor'
      : userInfo.roles[0] === 'Head_Of_Camp'
      ? '/head_Of_Camp'
      : userInfo.roles[0] === 'Trainee'
      ? '/trainee'
      : '/'
  );

  return false;
};
