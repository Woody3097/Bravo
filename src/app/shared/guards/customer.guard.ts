import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CustomersService } from '../services/customers.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerGuard implements CanActivate {
  customerIsAdmin: number;
  tokenNotExpired: boolean;
  constructor(
    private customersService: CustomersService,
    private auth: AuthService,
    private router: Router
  ) {}

  async canActivate() {
    await this.customersService
      .customerIsAdmin({
        token: localStorage.getItem('token'),
      })
      .toPromise()
      .then((data) => {
        this.customerIsAdmin = +data;
      })
      .catch((err) => {
        this.customerIsAdmin = 0;
      });

    await this.auth
      .tokenExpired(localStorage.getItem('token')!)
      .toPromise()
      .then((data) => {
        this.tokenNotExpired = data;
      })
      .catch((err) => {
        this.tokenNotExpired = false;
      });
    if (this.customerIsAdmin === 1 && this.tokenNotExpired) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
