import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userJson = localStorage.getItem('User');
  const user = userJson ? JSON.parse(userJson) : null;

  const isAdmin = user?.roles?.some((role: any) => role.value === 'ADMIN');

  if (isAdmin) {
    return true;
  }

  // If not admin - redirect to main page
  router.navigate(['/']);
  return false;
};
