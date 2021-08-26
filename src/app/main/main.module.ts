import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from '../customers/customers.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerGuard } from '../shared/guards/customer.guard';
import { CatalogComponent } from '../catalog/catalog.component';
import { MatSelectModule } from '@angular/material/select';
import { OrdersComponent } from '../orders/orders.component';
import { MatRippleModule } from '@angular/material/core';
import { DescriptionRowDirective } from '../shared/directives/description-row.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReactiveComponentModule } from '@ngrx/component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'customers',
        component: CustomersComponent,
        canActivate: [CustomerGuard],
      },
      {
        path: 'catalog',
        component: CatalogComponent,
        canActivate: [CustomerGuard],
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: '**',
        redirectTo: 'catalog',
      },
    ],
  },
];

@NgModule({
  declarations: [
    MainComponent,
    CustomersComponent,
    CatalogComponent,
    OrdersComponent,
    DescriptionRowDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatButtonToggleModule,
    ReactiveComponentModule,
  ],
})
export class MainModule {}
