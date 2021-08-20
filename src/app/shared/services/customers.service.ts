import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  _customerCompleteUrl,
  _customerEditUrl,
  _customerIsAdmin,
  _customersSearchUrl,
  _customersUrl,
} from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  getCustomers(user: any): Observable<any> {
    return this.http.post<any>(_customersUrl, user);
  }

  searchCustomers(searchStr: string): Observable<any> {
    let tmp = searchStr.split('');
    tmp.push('%');
    tmp.unshift('%');

    return this.http.post<any>(_customersSearchUrl, {
      searchStr: tmp.join(''),
    });
  }

  completeCustomer(user: any): Observable<any> {
    return this.http.put(_customerCompleteUrl, user);
  }

  editCustomer(data: any): Observable<any> {
    return this.http.post(_customerEditUrl, data);
  }

  customerIsAdmin(token: any): Observable<any> {
    return this.http.post(_customerIsAdmin, token);
  }
}
