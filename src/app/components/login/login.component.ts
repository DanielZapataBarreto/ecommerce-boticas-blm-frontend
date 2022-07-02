import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from '../../store/actions/auth.actions';
import * as fromAuth from '../../store/reducers/auth.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading!: Observable<boolean>;
  token!: string;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.token = this.authService.getTokenFromLocalStorage();
  }

  ngOnInit(): void {
    if (this.token !== null) {
      this.router.navigate(['/']);
    } else {
      this.loading = this.store.select(fromAuth.selectIsLoggingFromAuthState);
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName);
  }

  save(): void {
    let credentials = this.form.value;
    this.store.dispatch(AuthActions.loginRequest({ credentials }));
  }
}
