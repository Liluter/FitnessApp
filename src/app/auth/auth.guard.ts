import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // we only grand acces to rout if isAth is true
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false; // it wasn't add in course
    }
  }

  canLoad(route: Route) {
    // we only grand acces to rout if isAth is true
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false; // it wasn't add in course
    }
  }
}
