import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, user);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.url}/register`, user);
  }

  autologin(id: string): Observable<User> {
    let headers = new HttpHeaders({ token: this.getTokenFromLocalStorage() });
    return this.http.post<User>(`${this.url}/autologin`, { id }, { headers });
  }

  logout() {
    this.removeTokenAndIdFromLocalStorage();
  }

  setTokenAndIdInLocalStorage(user: User): any {
    localStorage.setItem('token', `Bearer ${user.accessToken}`);
    localStorage.setItem('_id', user._id);
  }

  getIdFromLocalStorage(): string {
    return localStorage.getItem('_id')!;
  }

  getTokenFromLocalStorage(): string {
    return localStorage.getItem('token')!;
  }

  removeTokenAndIdFromLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
  }
}
