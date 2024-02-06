import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, HTTP_OPTIONS } from '../core/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(API_URL + "login", {
      login: username,
      senha: password,
    }, HTTP_OPTIONS);
  }
}
