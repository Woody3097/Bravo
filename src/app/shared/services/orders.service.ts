import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _ordersConfirmUrl, _ordersUrl } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(token: string): Observable<any> {
    return this.http.post(_ordersUrl, { token });
  }

  confirmOrder(orderId: number): Observable<any> {
    return this.http.post(_ordersConfirmUrl, { orderId });
  }
}
