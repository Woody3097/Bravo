import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  _loginUrl,
  _registerUrl,
  _tokenExpiredUrl,
  _verificationUrl,
} from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(_loginUrl, user);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(_registerUrl, user);
  }

  verificateUser(userData: any): Observable<any> {
    return this.http.post<any>(_verificationUrl, userData);
  }

  tokenExpired(token: string): Observable<any> {
    return this.http.post(_tokenExpiredUrl, { token });
  }
}
