import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CatalogService } from '../../../shared/services/catalog.service';

@Component({
  selector: 'app-edit-catalog-modal',
  templateUrl: './edit-catalog-modal.component.html',
  styleUrls: ['./edit-catalog-modal.component.scss'],
})
export class EditCatalogModalComponent implements OnInit {
  number: number = 0;
  form: FormGroup = new FormGroup({
    productCode: new FormControl(this.data.productCode),
    productName: new FormControl(this.data.productName, [Validators.required]),
    productAvailability: new FormControl(this.data.productAvailability, [
      Validators.required,
    ]),
    units: new FormGroup({}),
  });
  tmp: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private catalogService: CatalogService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productCode.disable();
    this.data.units.forEach((el: any) => {
      this.unitsForm.addControl(
        this.number.toString(),
        new FormGroup({
          unitName: new FormControl(el.unitName),
          unitPrice: new FormControl(el.unitPrice),
        })
      );
      this.number++;
    });
    this.tmp = Object.entries(this.unitsForm.controls);
  }

  public get productCode(): AbstractControl {
    return <AbstractControl>this.form.get('productCode');
  }

  public get productName(): AbstractControl {
    return <AbstractControl>this.form.get('productName');
  }

  public get productAvailability(): AbstractControl {
    return <AbstractControl>this.form.get('productAvailability');
  }

  public get unitsForm() {
    return this.form.get('units') as FormGroup;
  }

  submit(): void {
    const errorStatus =
      this.productCode.hasError('required') ||
      this.productName.hasError('required') ||
      this.productAvailability.hasError('required');

    if (errorStatus) {
      return;
    } else {
      this.productCode.enable();
      console.log(this.form.value);
      this.catalogService.editCatalogEl(this.form.value).subscribe((res) => {
        console.log(res);
      });
      this.dialog.closeAll();
    }
  }

  deleteUnit(el1: any): void {
    Object.entries(this.unitsForm.controls).forEach((data) => {
      if (Object.keys(this.unitsForm.controls).length === 1) return;
      if (data[1] === el1) {
        this.unitsForm.removeControl(data[0]);
        this.tmp = Object.entries(this.unitsForm.controls);
      }
    });
  }

  addUnit(): void {
    this.unitsForm.addControl(
      this.number.toString(),
      new FormGroup({
        unitName: new FormControl(''),
        unitPrice: new FormControl(''),
      })
    );
    this.number++;
    this.tmp = Object.entries(this.unitsForm.controls);
  }
}
