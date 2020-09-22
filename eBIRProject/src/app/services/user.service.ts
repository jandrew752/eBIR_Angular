import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Brewery } from '../models/brewery';
import { Review } from '../models/review';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User = null;

  constructor(private router: Router, private http: HttpClient) { }

  public setUser(user: User): void {
    this.currentUser = user;
  }

  public getUser(): User {
    return this.currentUser;
  }

// Placeholder services until further updates

  public async register(u: User): Promise<boolean> {
    try {
      console.log(u);
      const user: Promise<User> = this.http.post<User>(environment.API_URL + '/user/register', {
        username : u.username,
        password : u.password,
        firstName : u.firstName,
        lastName : u.lastName,
        email : u.email,
        favorites : []
      }, {
        withCredentials: true
      }).toPromise();

      this.setUser(await user);
      return true;

    } catch (error) {
      console.log(error);
      return false;
    }
}

  public async login(u: string, p: string): Promise<boolean> {
    try {
        const user: Promise<User> = this.http.post<User>(environment.API_URL + '/user/login', {
        username: u,
        password: p
      }, {
        withCredentials: true
      }).toPromise();
        if (user != null) {
          this.setUser(await user);
          console.log(this.getUser);
          console.log(user);
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        } else {
          return false;
        }
    } catch (error) {
      console.log(error);
    }
  }

/*  public async logout(): Promise<void> {
    const response: Promise<void> = this.http.get<void>(environment.API_URL + '/logout',
    {
      withCredentials: true
    }).toPromise();

    sessionStorage.clear();

    return response;
  }
*/

  public async checkAuthorization(): Promise<boolean> {
    try {
      const response = await this.http.get<User>(environment.API_URL + '/login/check', {
        withCredentials: true
      }).toPromise();

      this.setUser(response);

      return true;
    } catch (error) {
      return false;
    }
  }

  // returns int[] of brewery ids
  public async getFavoritesList(username: string): Promise<number[]> {
    try {
      return await this.http.get<number[]>(
        environment.API_URL + '/user/' + username + '/favorites'
        ).toPromise();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async addFavorite(u: User, b: number): Promise<void> {
    try {
      await this.http.put(
        environment.API_URL + '/user/:' + u.username + '/favorites', { user: u, brewery: b }
      ).toPromise();
      console.log('Success!');
    } catch (error) {
      console.log(error);
    }
  }

  // id is id of brewery, need to check either on front end or back end if {id} is even in user favorites list
  public async removeFavorite(username: string, id: number): Promise<void> {
    try {
      await this.http.delete(
        environment.API_URL + '/user/:' + username + '/:' + id
        ).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  public async updateProfile(u: User): Promise<boolean> {
    try {
      console.log(u);
      const user: User = await this.http.put<User>(
        environment.API_URL + '/user/' + u.username, {
          username : u.username,
          password : u.password,
          firstName : u.firstName,
          lastName : u.lastName,
          email : u.email
        }
      ).toPromise();

      this.setUser(user);
      console.log('Success!');
      return true;

    } catch (error) {
      console.log(error);
      return false;
    }
  }



}
