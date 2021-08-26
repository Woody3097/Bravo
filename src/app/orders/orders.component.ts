import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogElement } from '../shared/interfaces/intrefaces';
import { Store } from '@ngrx/store';
import { CatalogService } from '../shared/services/catalog.service';
import { MatDialog } from '@angular/material/dialog';
import { changeSideBar } from '../shared/store/actions/side-bar.action';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AddCatalogModalComponent } from '../components/modals/add-catalog-modal/add-catalog-modal.component';
import { first } from 'rxjs/operators';
import { AddOrderModalComponent } from '../components/modals/add-order-modal/add-order-modal.component';
import { OrdersService } from '../shared/services/orders.service';
import { Router } from '@angular/router';
import { CustomersService } from '../shared/services/customers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['../shared/styles/section.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('.4s')),
    ]),
  ],
})
export class OrdersComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource: MatTableDataSource<CatalogElement>;
  displayedColumns: string[] = [
    'empty',
    'orderNo',
    'customerName',
    'customerNo',
    'orderItems',
    'orderNote',
    'orderDate',
    'reqDelivery',
    'status',
  ];
  displayedColumnsDetail: string[] = [
    'productCode',
    'productName',
    'unit',
    'quantity',
  ];
  rowActive: boolean = false;
  currentRes: any;
  isAdmin$: Observable<any>;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private ordersService: OrdersService,
    private customersService: CustomersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrders();
    this.isAdmin$ = this.customersService.customerIsAdmin({
      token: localStorage.getItem('token'),
    });
  }

  concatOrdersAndProducts(res: any): any {
    res.order = res.order.map((item: any) => {
      item.products = res.products.filter(
        (el: any) => el.idOrder === item.orderNo
      );
      item.orderItems = item.products.length;
      return item;
    });
    return res.order;
  }

  getOrders(): void {
    this.ordersService
      .getOrders(localStorage.getItem('token')!)
      .pipe(first())
      .subscribe((res) => {
        res = this.concatOrdersAndProducts(res);
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  changeSideBarState(): void {
    this.store.dispatch(changeSideBar());
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddOrderModalComponent);
    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((res) => {
        setTimeout(() => this.getOrders(), 1000);
      });
  }

  searchOrders(event: Event): void {}

  setActiveRow(index: number): void {
    const element = document.getElementsByClassName('mat-row-main')[index];
    const element2 = document.getElementsByClassName('expand')[index];
    element2.classList.toggle('expand-rotate');
    element.classList.toggle('active-row');
  }

  setPrintData(element: any): void {
    localStorage.setItem('printData', JSON.stringify(element));
    this.router.navigate(['../print']);
  }

  confirmOrder(event: Event, id: number): void {
    event.stopPropagation();
    this.ordersService
      .confirmOrder(id)
      .toPromise()
      .then((data) => {
        this.getOrders();
      })
      .catch((err) => {
        console.log(1);
        this.getOrders();
      });
  }
}
