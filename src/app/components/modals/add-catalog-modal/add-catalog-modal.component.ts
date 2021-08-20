import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CatalogService } from '../../../shared/services/catalog.service';

@Component({
  selector: 'app-add-catalog-modal',
  templateUrl: './add-catalog-modal.component.html',
  styleUrls: ['./add-catalog-modal.component.scss'],
})
export class AddCatalogModalComponent implements OnInit {
  form: FormGroup = new FormGroup({
    productName: new FormControl(''),
    productAvailability: new FormControl('', [Validators.required]),
    units: new FormGroup({}),
  });
  tmp: any;
  number: number = 0;
  constructor(
    private router: Router,
    private catalogService: CatalogService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
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
    this.catalogService.addCatalogEl(this.form.value).subscribe((res) => {
      console.log(res);
    });
    this.dialog.closeAll();
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
