import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CatalogElement,
  CustomerElement,
  SectionDataInterface,
} from '../shared/interfaces/intrefaces';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { changeSideBar } from '../shared/actions/side-bar.action';
import { AuthService } from '../shared/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['../shared/styles/section.scss'],
})
export class CatalogComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource: MatTableDataSource<CatalogElement>;
  displayedColumns: string[] = [
    'productCode',
    'productName',
    'productUnit',
    'productPrice',
    'productAvailability',
    'action',
  ];

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .getCatalog({ token: localStorage.getItem('token') })
      .pipe(first())
      .subscribe((res) => {
        res = this.concatProductAndUnits(res);
        this.dataSource = new MatTableDataSource<any>(res.products);
        this.dataSource.paginator = this.paginator;
      });
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

  openEditModal(el: any): void {}

  getSortCatalog(): void {}

  searchCatalog(event: any): void {
    if (event.target.value === '') {
      this.authService
        .getCatalog({ token: localStorage.getItem('token') })
        .subscribe((res) => {
          res = this.concatProductAndUnits(res);
          this.dataSource = new MatTableDataSource<any>(res.products);
        });
      return;
    }
    this.authService.searchCatalog(event.target.value).subscribe((res) => {
      res = this.concatProductAndUnits(res);
      this.dataSource = new MatTableDataSource<any>(res.products);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCatalogEl(id: number): void {
    this.authService
      .deleteCatalogEl(id)
      .pipe(first())
      .subscribe((res) => {
        this.getSortCatalog();
      });
  }

  changeSideBarState(): void {
    this.store.dispatch(changeSideBar());
  }
}
