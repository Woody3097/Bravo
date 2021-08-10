import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerGuard implements CanActivate {
  can: number;
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate() {
    this.can = await this.auth
      .customerIsAdmin({ token: localStorage.getItem('token') })
      .pipe(first())
      .toPromise();
    if (this.can === 1) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
