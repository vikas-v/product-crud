import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(user): Observable<any> {
    if (user.username.toLowerCase() === environment.demoUser.username &&  user.password === environment.demoUser.password) {
      localStorage.setItem('ACCESS_TOKEN', 'access_token');
      return of(environment.demoUser);
    } else {
      return throwError('Invalid Credentials');
    }
  }

  logout(): void {
    localStorage.removeItem('ACCESS_TOKEN');
  }

  get isLoggedId(): boolean {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  get user() {
    if (this.isLoggedId) {
      return {
        username: environment.demoUser.username,
        name: environment.demoUser.name
      };
    } else {
      return null;
    }
  }
}
