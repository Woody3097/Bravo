import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['../../shared/styles/auth.scss'],
})
export class VerificationComponent implements OnInit {
  checkVerification: boolean = false;
  form!: FormGroup;
  @ViewChild('secondInput') input!: ElementRef;

  constructor(private authService: AuthService, private router: Router) {}

  public get firstControl(): AbstractControl {
    return <AbstractControl>this.form.get('firstInput');
  }
  public get secondControl(): AbstractControl {
    return <AbstractControl>this.form.get('secondInput');
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstInput: new FormControl('', [Validators.maxLength(3)]),
      secondInput: new FormControl('', [Validators.maxLength(3)]),
    });
  }

  checkInputLength(): void {
    if (this.firstControl.value.length === 3) {
      this.input.nativeElement.focus();
    }
    if (
      this.firstControl.value.length === 3 &&
      this.secondControl.value.length === 3
    ) {
      this.sendVerification();
    }
  }

  sendVerification(): void {
    const userCode =
      this.firstControl.value.toString() + this.secondControl.value.toString();
    const token = localStorage.getItem('token');
    this.authService.verificateUser({ userCode, token }).subscribe(
      (res) => {
        this.checkVerification = !res;
        if (res) {
          this.router.navigate(['/main']);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
