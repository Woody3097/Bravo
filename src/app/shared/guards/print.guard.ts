import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PrintGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (!!localStorage.getItem('printData')) {
      return true;
    } else {
      this.router.navigate(['/main/orders']);
      return false;
    }
  }
}
