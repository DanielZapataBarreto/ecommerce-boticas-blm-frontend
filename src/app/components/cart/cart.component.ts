import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as fromCart from '../../store/reducers/cart.reducers';
import * as fromAuth from '../../store/reducers/auth.reducers';
import * as CartActions from '../../store/actions/cart.actions';
import { Product } from 'src/app/models/product.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalQuantityCartItems!: Observable<number>;
  cartItems!: Observable<Array<fromCart.CartProduct>>;
  baseUrl: string = `${environment.apiBaseUrl}/uploads`;
  montoTotal!: Observable<number>;
  id!: Observable<string>;
  address!: Observable<Object>;

  loading: boolean = false;

  constructor(private store: Store, private orderService: OrderService) { }

  ngOnInit(): void {
    this.totalQuantityCartItems = this.store.select(fromCart.selectTotalQuantityFromCartState);
    this.cartItems = this.store.select(fromCart.selectCartItemsFromCartState);
    this.montoTotal = this.store.select(fromCart.selectTotalAmountFromCartState);
    this.id = this.store.select(fromAuth.selectUserIdFromAuthState);
    this.address = this.store.select(fromAuth.selectUserAddressFromAuthState);
  }

  addProductToCart(item: fromCart.CartProduct): void {
    const product: Product = {
      categories: item.categories,
      description: item.description,
      image: item.image,
      price: item.price,
      stock: item.stock,
      title: item.title
    }
    this.store.dispatch(CartActions.addProductToCart({ product }));
  }

  removeProductFromCart(product: fromCart.CartProduct): void {
    this.store.dispatch(CartActions.removeProductToCart({ title: product.title }));
  }

  goPay(): void {
    this.loading = true;
    let userId: any = "";
    let products: any = [];
    let amount: any = 0;
    let address: any = {};
    this.id.subscribe(val => userId = val);
    this.cartItems.subscribe(val => products = val);
    this.montoTotal.subscribe(val => amount = val);
    this.montoTotal.subscribe(val => amount = val);
    this.address.subscribe(val => address = val);
    let order = {
      userId,
      products,
      amount,
      address
    }
    this.orderService.createOrder(order).subscribe((res) => {
      console.log(res);
      this.loading = false;
    }, (err) => {
      console.log(err);
      this.loading = false;
    });
  }
}
