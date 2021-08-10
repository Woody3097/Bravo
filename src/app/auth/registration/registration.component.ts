import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../../shared/styles/auth.scss'],
})
export class RegistrationComponent implements OnInit {
  currentError!: string;
  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  public get emailControl(): AbstractControl {
    return <AbstractControl>this.form.get('email');
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
    });
  }

  clearCurrentError(): void {
    this.currentError = '';
  }

  signUp(): void {
    console.log(this.emailControl.value);
    this.authService.registerUser({ email: this.emailControl.value }).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/registration-complete']);
      },
      (error) => {
        this.currentError = error.error;
      }
    );
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
