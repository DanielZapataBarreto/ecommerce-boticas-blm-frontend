import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { showNotification, showReport } from '../shared/utils/messages.util';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.authService.getTokenFromLocalStorage();
    if (token === null) {
      showReport(
        'info',
        'Info',
        'Debe iniciar sesión para poder mostrar o agregar productos al carrito'
      );
      this.router.navigate(['/']);
      return false;
    }

    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      if (!decodedToken) {
        this.authService.removeTokenAndIdFromLocalStorage();
        showReport(
          'failure',
          'Error',
          'Token no válido. Regresará a la página de inicio'
        );
        this.router.navigate(['/']);
        return false;
      }
    } catch (error) {
      this.authService.removeTokenAndIdFromLocalStorage();
      showReport(
        'failure',
        'Error',
        'Token no válido. Regresará a la página de inicio'
      );
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
