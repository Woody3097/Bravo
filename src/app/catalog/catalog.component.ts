import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogElement } from '../shared/interfaces/intrefaces';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { changeSideBar } from '../shared/store/actions/side-bar.action';
import { AuthService } from '../shared/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditCatalogModalComponent } from '../components/modals/edit-catalog-modal/edit-catalog-modal.component';
import { DeleteCatalogModalComponent } from '../components/modals/delete-catalog-modal/delete-catalog-modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { AddCatalogModalComponent } from '../components/modals/add-catalog-modal/add-catalog-modal.component';
import { CatalogService } from '../shared/services/catalog.service';
import { ReplaceCatalogModalComponent } from '../components/modals/replace-catalog-modal/replace-catalog-modal.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['../shared/styles/section.scss'],
})
export class CatalogComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  isDeleteDialogRef: MatDialogRef<DeleteCatalogModalComponent>;
  dataSource: MatTableDataSource<CatalogElement>;
  availabilitySelectActive: boolean = false;
  availabilitySelectForm = new FormGroup({
    'In Stock': new FormControl(false),
    'Out Stock': new FormControl(false),
    Discontinued: new FormControl(false),
  });
  displayedColumns: string[] = [
    'productCode',
    'productName',
    'productUnit',
    'productPrice',
    'productAvailability',
    'action',
  ];
  columnWidth: string = '16.666%';

  constructor(
    private store: Store,
    private catalogService: CatalogService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getSortCatalog();
  }

  concatProductAndUnits(res: any): any {
    res.products = res.products.map((item: any) => {
      item.units = res.units.filter(
        (el: any) => el.idProduct === item.productCode
      );
      return item;
    });
    return res;
  }

  openEditModal(el: any): void {
    const a = this.dialog.open(EditCatalogModalComponent, {
      data: el,
    });
    a.afterClosed()
      .pipe(first())
      .subscribe((res) => {
        setTimeout(() => this.getSortCatalog(), 1000);
      });
  }

  getSortCatalog(): void {
    this.catalogService
      .getCatalog({ token: localStorage.getItem('token') })
      .pipe(first())
      .subscribe((res) => {
        res = this.concatProductAndUnits(res);
        this.dataSource = new MatTableDataSource<any>(res.products);
        this.dataSource.paginator = this.paginator;
      });
  }

  searchCatalog(event: any): void {
    if (event.target.value === '') {
      this.catalogService
        .getCatalog({ token: localStorage.getItem('token') })
        .subscribe((res) => {
          res = this.concatProductAndUnits(res);
          this.dataSource = new MatTableDataSource<any>(res.products);
        });
      return;
    }
    this.catalogService.searchCatalog(event.target.value).subscribe((res) => {
      res = this.concatProductAndUnits(res);
      this.dataSource = new MatTableDataSource<any>(res.products);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCatalogEl(id: number, name: string): void {
    this.isDeleteDialogRef = this.dialog.open(DeleteCatalogModalComponent, {
      data: name,
    });
    this.isDeleteDialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((res) => {
        if (res != undefined && res.isDelete) {
          if (res.isDelete) {
            this.catalogService
              .deleteCatalogEl(id)
              .pipe(first())
              .toPromise()
              .then((data) => {
                this.getSortCatalog();
              });
          }
        }
      });
  }

  changeSideBarState(): void {
    this.store.dispatch(changeSideBar());
  }

  toggleAvailabilitySelect(): void {
    this.availabilitySelectActive = !this.availabilitySelectActive;
  }

  sortCatalog(): void {
    let sortParamsArray = Object.entries(this.availabilitySelectForm.value)
      .filter((el) => {
        return el[1];
      })
      .map((el) => {
        return el[0];
      });
    if (sortParamsArray.length === 0) {
      this.catalogService
        .getCatalog({ token: localStorage.getItem('token') })
        .subscribe((res) => {
          res = this.concatProductAndUnits(res);
          this.dataSource = new MatTableDataSource<any>(res.products);
        });
      return;
    }
    this.catalogService.sortCatalog(sortParamsArray).subscribe((res) => {
      res = this.concatProductAndUnits(res);
      this.dataSource = new MatTableDataSource<any>(res.products);
      this.dataSource.paginator = this.paginator;
    });
  }

  openAddModal(): void {
    const a = this.dialog.open(AddCatalogModalComponent);
    a.afterClosed()
      .pipe(first())
      .subscribe((res) => {
        setTimeout(() => this.getSortCatalog(), 1000);
      });
  }

  replaceCatalog(): void {
    const a = this.dialog.open(ReplaceCatalogModalComponent);
    a.afterClosed()
      .pipe(first())
      .toPromise()
      .then((data) => {
        if (data != undefined && data.isReplace) {
          if (data.isReplace) {
            setTimeout(() => this.getSortCatalog(), 1000);
          }
        }
      });
  }
}
