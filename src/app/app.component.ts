import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import * as AuthActions from './store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  id: string;

  constructor(private store: Store, private authService: AuthService) {
    this.id = localStorage.getItem('_id')!;
  }

  ngOnInit() {
    this.autoLogin();
  }

  autoLogin(): void {
    if (this.id) {
      this.store.dispatch(AuthActions.autoLoginRequest({ id: this.id }));
    }
  }
}
