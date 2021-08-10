import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-edit-customer-modal',
  templateUrl: './edit-customer-modal.component.html',
  styleUrls: ['../../auth/auth.scss']
})
export class EditCustomerModalComponent implements OnInit {
  form: FormGroup = new FormGroup({
    customerNo: new FormControl( this.data.customerNo),
    customerName: new FormControl(this.data.customerName, [Validators.required]),
    customerAddress: new FormControl(this.data.customerAddress, [Validators.required]),
    dayNames: new FormControl(this.data.dayNames, [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private auth: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.customerNo.disable()
  }

  public get customerNo(): AbstractControl {
    return <AbstractControl>this.form.get('customerNo');
  }

  public get customerName(): AbstractControl {
    return <AbstractControl>this.form.get('customerName');
  }

  public get customerAddress(): AbstractControl {
    return <AbstractControl>this.form.get('customerAddress');
  }

  public get dayNames(): AbstractControl {
    return <AbstractControl>this.form.get('dayNames');
  }

  submit(): void {
    const formCompleteData = {
      customerNo: this.customerNo.value,
      customerName: this.customerName.value,
      customerAddress: this.customerAddress.value,
      dayNames: this.dayNames.value
    };
    const errorStatus = this.customerNo.hasError('required')
      || this.customerName.hasError('required')
      || this.customerAddress.hasError('required')
      || this.dayNames.hasError('required')

    if(errorStatus) {
      return;
    }
    else {
      this.auth.editCustomer({data: formCompleteData}).subscribe(res => {
        console.log(res)
      });
      this.dialog.closeAll();
    }
  }

}
