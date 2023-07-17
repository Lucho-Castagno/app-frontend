import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const autenticacionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sesion = localStorage.getItem("sesion");

  if (sesion) {
    return true;
  } else {
    router.navigateByUrl("/");
  }

  return false;

};
