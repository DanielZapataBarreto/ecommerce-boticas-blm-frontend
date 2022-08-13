import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import * as CartActions from '../../store/actions/cart.actions';
import * as fromProduct from '../../store/reducers/product.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Array<any> = [];
  personalCareProducts: Array<any> = [];
  medicineProducts: Array<any> = [];
  hairCareProducts: Array<any> = [];
  loading: Boolean = false;
  baseUrl: string = `${environment.apiBaseUrl}/uploads`;

  personalCareProducts$!: Observable<Array<Product>>;
  medicineProducts$!: Observable<Array<Product>>;
  hairCareProducts$!: Observable<Array<Product>>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.personalCareProducts$ = this.store.select(fromProduct.selectPersonalCareProductsFromProductState);
    this.medicineProducts$ = this.store.select(fromProduct.selectMedicineProductsFromProductState);
    this.hairCareProducts$ = this.store.select(fromProduct.selectHairCareProductsFromProductState);
    this.loading$ = this.store.select(fromProduct.selectIsLoadingFromProductState);
  }

  addProductToCart(product: Product) {
    this.store.dispatch(CartActions.addProductToCart({ product }));
  }
}
