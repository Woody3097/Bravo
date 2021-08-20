import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CustomersService } from '../../shared/services/customers.service';

@Component({
  selector: 'app-registration-complete',
  templateUrl: './registration-complete.component.html',
  styleUrls: ['../../shared/styles/auth.scss'],
})
export class RegistrationCompleteComponent implements OnInit {
  form: FormGroup = new FormGroup({
    customerName: new FormControl('', [Validators.required]),
    customerAddress: new FormControl('', [Validators.required]),
    dayNames: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {}

  public get customerName(): AbstractControl {
    return <AbstractControl>this.form.get('customerName');
  }

  public get customerAddress(): AbstractControl {
    return <AbstractControl>this.form.get('customerAddress');
  }

  public get dayNames(): AbstractControl {
    return <AbstractControl>this.form.get('dayNames');
  }

  complete(): void {
    const formCompleteData = {
      customerNo: '',
      customerName: this.customerName.value,
      customerAddress: this.customerAddress.value,
      dayNames: this.dayNames.value,
    };
    const errorStatus =
      this.customerName.hasError('required') ||
      this.customerAddress.hasError('required') ||
      this.dayNames.hasError('required');

    if (errorStatus) {
      return;
    } else {
      this.customersService
        .completeCustomer({
          token: localStorage.getItem('token'),
          data: formCompleteData,
        })
        .subscribe((res) => {
          console.log(res);
        });
      this.router.navigate(['/main/customers']);
    }
  }
}
