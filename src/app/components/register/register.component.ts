import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as fromAuth from '../../store/reducers/auth.reducers';
import { departamentos } from '../../shared/ubigeos/departamentos';
import { provincias } from '../../shared/ubigeos/provincias';
import { distritos } from '../../shared/ubigeos/distritos';
import { showNotification } from 'src/app/shared/utils/messages.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading!: Observable<boolean>;
  token!: string;
  departments: any = departamentos;
  provinces: any = [];
  districts: any = [];

  loadingProvinces: boolean = false;
  loadingDistricts: boolean = false;

  strongPasswordRegex: any = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
      department: new FormControl([], [Validators.required]),
      province: new FormControl([], [Validators.required]),
      district: new FormControl([], [Validators.required]),
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

  register(): void {
    let user = this.form.value;
    user = {
      ...user,
      address: {
        department: user.department,
        district: user.district,
        province: user.province,
      }
    }
    this.authService.register(user).subscribe((res) => {
      showNotification(
        'success',
        `Registro exitoso.`
      );
      this.router.navigateByUrl('/login');
    }, ({ error }) => {
      showNotification('failure', error);
    })
  }

  onChangeDepartmentSelect(departmentId: any, event: any): void {
    if (event.isUserInput) {
      this.form.controls['province'].disable();
      this.provinces = [];
      this.districts = [];
      for (const key in provincias) {
        if (departmentId === key) {
          this.provinces = provincias[key as keyof typeof provincias]
          break;
        }
      }
      this.form.controls['province'].enable();
    }
  }

  onChangeProvinceSelect(districtId: string, event: any): void {
    if (event.isUserInput) {
      this.form.controls['district'].disable();
      this.districts = [];
      for (const key in distritos) {
        if (districtId === key) {
          this.districts = distritos[key as keyof typeof distritos]
          break;
        }
      }
      this.form.controls['district'].enable();
    }
  }
}
