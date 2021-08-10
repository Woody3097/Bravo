import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { first } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditCustomerModalComponent } from '../components/edit-customer-modal/edit-customer-modal.component';
import { Store } from '@ngrx/store';
import { CustomerElement } from '../shared/interfaces/intrefaces';
import { changeSideBar } from '../shared/actions/side-bar.action';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['../shared/styles/section.scss'],
})
export class CustomersComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = [
    'customerNo',
    'customerName',
    'customerAddress',
    'dayNames',
  ];
  dataSource: MatTableDataSource<CustomerElement>;
  sortWay: string = 'DESC';

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getSortCustomers();
  }

  toggleSortWay(): string {
    return this.sortWay === 'ASC' ? 'DESC' : 'ASC';
  }

  getSortCustomers() {
    this.sortWay = this.toggleSortWay();
    this.auth
      .getCustomers({
        token: localStorage.getItem('token'),
        sortWay: this.sortWay,
      })
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource<CustomerElement>(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  searchCustomers(event: any) {
    if (event.target.value === '') {
      this.auth
        .getCustomers({
          token: localStorage.getItem('token'),
          sortWay: this.sortWay,
        })
        .subscribe((res) => {
          this.dataSource = new MatTableDataSource<CustomerElement>(res);
          this.dataSource.paginator = this.paginator;
        });
      return;
    }
    this.auth.searchCustomers(event.target.value).subscribe((res) => {
      this.dataSource = new MatTableDataSource<CustomerElement>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  openEditModal(el: CustomerElement): void {
    this.dialog.open(EditCustomerModalComponent, {
      data: el,
    });
    this.dialog.afterAllClosed.pipe(first()).subscribe((res) => {
      this.sortWay = this.toggleSortWay();
      this.getSortCustomers();
    });
  }

  changeSideBarState(): void {
    this.store.dispatch(changeSideBar());
  }
}
