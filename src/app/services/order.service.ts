import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = `${environment.apiBaseUrl}/order`;
  urlPayment = `${environment.apiBaseUrl}/payment`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  createOrder(order: any): Observable<any> {
    let headers = new HttpHeaders({
      token: this.authService.getTokenFromLocalStorage(),
    });
    return this.http.post(`${this.url}`, order, { headers });
  }

  createPayment(amount: number): Observable<any> {
    let headers = new HttpHeaders({
      token: this.authService.getTokenFromLocalStorage(),
    });
    let obj = {
      amount,
    };
    return this.http.post(`${this.urlPayment}/create-payment`, obj, {
      headers,
    });
  }
}
