import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import * as fromAuth from '../../../store/reducers/auth.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user$!: Observable<User>;

  constructor(
    private store: Store<fromAuth.State>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select(fromAuth.selectUserFromAuthState);
  }

  logout(): void {
    this.authService.logout();
    location.reload();
  }
}
