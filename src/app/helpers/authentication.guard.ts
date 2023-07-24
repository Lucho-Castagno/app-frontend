import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const session = localStorage.getItem("session");

  if (session) {
    return true;
  } else {
    router.navigateByUrl("/");
  }

  return false;

};
