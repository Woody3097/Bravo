import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { elementAt, first } from 'rxjs/operators';
import { CatalogService } from '../../../shared/services/catalog.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-replace-catalog-modal',
  templateUrl: './replace-catalog-modal.component.html',
  styleUrls: ['./replace-catalog-modal.component.scss'],
})
export class ReplaceCatalogModalComponent implements OnInit {
  file: File | undefined;
  columns: string[] = [
    'productCode',
    'productName',
    'productUnit',
    'productPrice',
    'productAvailability',
  ];
  styleObj = {
    cursor: 'pointer',
  };
  errList: string[] = [];
  form: FormGroup = new FormGroup({
    button: new FormControl('Replace catalog'),
  });
  validatedData: any = [];

  ngOnInit(): void {
    this.button.disable();
  }

  constructor(
    private catalogService: CatalogService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ReplaceCatalogModalComponent>
  ) {}

  public get button(): AbstractControl {
    return this.form.get('button') as AbstractControl;
  }

  showFile(event: any): void {
    this.errList = [];
    this.validatedData = [];
    if (!this.checkFileType(event.target.files[0].name)) {
      this.errList.push("Isn't a csv");
      return;
    }
    if (event.target.files[0].size === 0) {
      this.errList.push('File is empty!');
      return;
    }
    this.file = event.target.files[0];
    this.styleObj = { cursor: 'auto' };
    this.file?.text().then((data) => {
      let parsedData = data
        .split('')
        .filter((el) => el != '\r')
        .join('')
        .split('\n');
      if (parsedData[parsedData.length - 1].length === 0) {
        parsedData.splice(parsedData.length - 1, 1);
      }
      this.validateData(parsedData);
    });
  }

  validateData(parsedData: any): void {
    if (parsedData[0] !== this.columns.join(',')) {
      this.errList.push('Columns are not like in template!');
      return;
    }
    parsedData.splice(0, 1);
    let check = parsedData.every((el: string, index: number) => {
      let validatedElement: any = {
        units: {},
      };
      let tmpElement = el.split(',');
      if (tmpElement.length !== 4) {
        this.errList.push(`Row[${index + 1}] isn't full!`);
        return false;
      } else {
        if (tmpElement[0].length !== 0) {
          validatedElement.productName = tmpElement[0];
        } else {
          this.errList.push(`Row[${index + 1}] Name should be!`);
        }
        if (tmpElement[1].length !== 0) {
          tmpElement[1].split('|').forEach((element, index) => {
            validatedElement.units[index] = { unitName: element };
          });
        } else {
          this.errList.push(`Row[${index + 1}] Unit should be!`);
        }
        if (tmpElement[2].length !== tmpElement[1].length) {
          tmpElement[2].split('|').forEach((element, index) => {
            validatedElement.units[index].unitPrice = element;
          });
        } else {
          this.errList.push(`Row[${index + 1}] Price should be!`);
        }
        if (
          tmpElement[3] === 'In Stock' ||
          tmpElement[3] === 'Out Stock' ||
          tmpElement[3] === 'Discontinued'
        ) {
          validatedElement.productAvailability = tmpElement[3];
        } else {
          this.errList.push(`Row[${index + 1}] Wrong availability!`);
        }
        this.validatedData.push(validatedElement);
        return true;
      }
    });
    if (!check) return;
    this.button.enable();
  }

  checkFileType(name: string): boolean {
    let str = name.split('.');
    return str[str.length - 1] === 'csv';
  }

  clearFile(): void {
    this.file = undefined;
    this.styleObj = { cursor: 'pointer' };
    this.errList = [];
    this.button.disable();
  }

  replace(): void {
    this.catalogService
      .replaceCatalog({ replaceData: this.validatedData })
      .pipe(first())
      .subscribe((res) => {});
    this.dialogRef.close({ isReplace: true });
  }
  cancel(): void {
    this.dialogRef.close({ isReplace: false });
  }
}
