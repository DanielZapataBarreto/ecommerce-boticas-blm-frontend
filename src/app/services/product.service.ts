import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:4201/api/v1/product';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(this.url);
  }

  filterProducts(filtro: any): Observable<any> {
    return this.http.get(`${this.url}/${filtro}`);
  }
}
