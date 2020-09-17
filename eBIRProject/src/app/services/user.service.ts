import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;

  constructor(private router: Router, private http: HttpClient) { }

  public setUser(user: User): void {
    this.currentUser = user;
  }

  public getUser(): User {
    return this.currentUser;
  }

/* Placeholder services until further updates

  public async register(u: string, p: string, cp: string, fn: string, ln: string, e: string): Promise<User> {
    try {
      const response: Promise<User> = this.http.post<User>(environment.API_URL + ':' + environment.PORT + '/project2/register', {
        username: u,
        password: p,
        confirmpassword: cp,
        firstname: fn,
        lastname: ln,
        email: e
      }, {
        withCredentials: true
      }).toPromise();

      this.setUser(await response);
      sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));

      return response;

    } catch (error) {
      console.log(error);
    }
}

  public async login(u: string, p: string): Promise<User> {
    try {
      const response: Promise<User> = this.http.post<User>(environment.API_URL + ':' + environment.PORT + '/project2/login', {
        username: u,
        password: p
      }, {
        withCredentials: true
      }).toPromise();

      this.setUser(await response);
      sessionStorage.setItem('currentUser', JSON.stringify(user));

      return response;

    } catch(error) {
      console.log(error);
    }
  }

  public async logout(): Promise<void> {
    const response: Promise<void> = this.http.get<void>(environment.API_URL + ':' + environment.PORT + '/project2/logout',
    {
      withCredentials: true
    }).toPromise();

    return response;
  }

  public async checkAuthorization(): Promise<boolean> {
    try {
      const response = await this.http.get<User>(environment.API_URL + ':' + environment.PORT + '/project2/login/check', {
        withCredentials: true
      }).toPromise();

      this.setUser(response);

      return true;
    } catch (error) {
      return false;
    }
  }
*/
}
