import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brewery } from 'src/app/models/brewery';
import { User } from 'src/app/models/user';
import { BreweryService } from 'src/app/services/brewery.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  u: User = JSON.parse(sessionStorage.getItem('currentUser'));
  closeResult = '';
  uFirstname = '';
  uLastname = '';
  uPassword = '';
  uEmail = '';
  isOpen = false;
  favoriteBreweryList: Brewery[] = [];

  constructor(private bs: BreweryService, private us: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // if (sessionStorage.getItem('currentUser') == null) {
    //   this.router.navigateByUrl('/login');
    //   alert('Please login');
    // }
    this.favoritesList();
  }

  async favoritesList(): Promise<void> {
    this.u.favorites = await this.us.getFavoritesList(this.u.username);

    this.u.favorites.forEach(async f => {
      this.favoriteBreweryList.push(await this.bs.getSingleBrewery(f));
    });
      // this.u.favorites = new Set();
  }

  async removeFavorite(id: number): Promise<void> {
      await this.us.removeFavorite(this.u.username, id);
      alert('Successfully deleted brewery from Favorites list');
      location.reload();
  }

  goBack(): void {
    this.router.navigateByUrl('/home');
  }

  async update(): Promise<void> {
    if (this.uFirstname.trim() !== '') { this.u.firstName = this.uFirstname; }
    if (this.uLastname.trim() !== '') { this.u.lastName = this.uLastname; }
    if (this.uPassword.trim() !== '') {
      this.u.password = this.uPassword;
    } else { this.u.password = ''; }
    if (this.uEmail.trim() !== '') { this.u.email = this.uEmail; }
    if (await this.us.updateProfile(this.u)) {
      sessionStorage.setItem('currentUser', JSON.stringify(this.us.getUser()));
      alert('Successfully Updated Profile Information!');
      location.reload();
    } else {
      alert('Problem updating profile!');
    }
  }
}
