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

  currentUser: User;

  constructor(private router: Router, private http: HttpClient) { }

  public setUser(user: User): void {
    this.currentUser = user;
  }

  public getUser(): User {
    return this.currentUser;
  }

// Placeholder services until further updates

  public async register(u: User): Promise<User> {
    try {
      const user: Promise<User> = this.http.post<User>(environment.API_URL + '/user/register', {
        user: u
      }, {
        withCredentials: true
      }).toPromise();

      this.setUser(await user);
      sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      return user;

    } catch (error) {
      console.log(error);
    }
}

  public async login(u: string, p: string): Promise<void> {
    try {
        const user: Promise<User> = this.http.post<User>(environment.API_URL + '/user/login', {
        "username": u,
        "password": p
      }, {
        withCredentials: true
      }).toPromise();

        this.setUser(await user);
        console.log(user);
        sessionStorage.setItem('currentUser', JSON.stringify(user));

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

  public async getFavoritesList(id: number): Promise<Review[]> {
    try {
      return await this.http.get<Review[]>(
        environment.API_URL + '/user/getFavorites/${id}'
        ).toPromise();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async removeFavorite(id: number): Promise<void> {
    try {
      await this.http.delete(
        environment.API_URL + '/user/deleteFavorites/${id}'
        ).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  public async updateProfile(u: User): Promise<void> {
    try {
      console.log(u);
      await this.http.put(
        environment.API_URL + '/user/update', {
          user: u
        }
      ).toPromise();
      console.log('Success!');
    } catch (error) {
      console.log(error);
    }
  }

  public async addFavorite(u: User, b: Brewery): Promise<void> {
    try {
      await this.http.put(
        environment.API_URL + '/user/addFavorite/', { user: u, brewery: b }
      ).toPromise();
      console.log('Success!');
    } catch (error) {
      console.log(error);
    }
  }

}
