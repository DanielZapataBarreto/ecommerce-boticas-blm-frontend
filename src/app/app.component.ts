import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/actions/auth.actions';
import * as ProductActions from './store/actions/product.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  id: string;

  constructor(private store: Store) {
    this.id = localStorage.getItem('_id')!;
  }

  ngOnInit() {
    this.autoLogin();
    this.store.dispatch(ProductActions.getAllProducts());
  }

  autoLogin(): void {
    if (this.id) {
      this.store.dispatch(AuthActions.autoLoginRequest({ id: this.id }));
    }
  }
}
