import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss']
})
export class LoginComponent implements OnInit {
  currentError!: string;
  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  public get emailControl(): AbstractControl {
    return <AbstractControl>this.form.get('email');
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ])
    });
  }

  clearCurrentError(): void {
    this.currentError = ''
  }

  logIn(): void {
    this.authService.loginUser({email: this.emailControl.value}).subscribe(res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/verification'])
    },
      error => {
        this.currentError = error.error
        console.log(error);
      }
    )
  }
}
