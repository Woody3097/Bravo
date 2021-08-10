import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl: string = "http://localhost:3000/api/usersLogin";
  private _registerUrl: string = "http://localhost:3000/api/usersRegister";
  private _verificationUrl: string = "http://localhost:3000/api/usersVerification";
  private _customersUrl: string = "http://localhost:3000/api/customers";
  private _customersSearchUrl: string = "http://localhost:3000/api/customers-search";
  private _customerCompleteUrl: string = "http://localhost:3000/api/customer-complete";
  private _customerEditUrl: string = "http://localhost:3000/api/customer-edit";
  private _customerIsAdmin: string = "http://localhost:3000/api/customer-is-admin"

  constructor(private http: HttpClient) { }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(this._loginUrl, user);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(this._registerUrl, user);
  }

  verificateUser(userData: any): Observable<any> {
    return this.http.post<any>(this._verificationUrl, userData)
  }

  getCustomers(user: any): Observable<any> {
    return this.http.post<any>(this._customersUrl, user)
  }

  searchCustomers(searchStr: string): Observable<any> {
    let tmp = searchStr.split('')
    tmp.push('%')
    tmp.unshift('%')

    return this.http.post<any>(this._customersSearchUrl, {searchStr: tmp.join('')})
  }

  completeCustomer(user: any): Observable<any> {
    return this.http.put(this._customerCompleteUrl, user)
  }

  editCustomer(data: any): Observable<any> {
    return this.http.post(this._customerEditUrl, data)
  }

  customerIsAdmin(token: any): Observable<any> {
    return this.http.post(this._customerIsAdmin, token)
  }
}
