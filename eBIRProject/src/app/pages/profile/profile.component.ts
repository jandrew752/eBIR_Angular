import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brewery } from 'src/app/models/brewery';
import { User } from 'src/app/models/user';
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

  constructor(private us: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // if (sessionStorage.getItem('currentUser') == null) {
    //   this.router.navigateByUrl('/login');
    //   alert('Please login');
    // }
    this.favoritesList();
  }

  async favoritesList(): Promise<void> {
    this.u.favorites = await this.us.getFavoritesList(this.u.username);
      // this.u.favorites = new Set();
  }

  async removeFavorite(id: number): Promise<void> {
//      await this.us.removeFavorite(id);
      alert('Successfully deleted brewery from Favorites list');
      location.reload();
  }

  goBack(): void {
    this.router.navigateByUrl('/home');
  }

  update(): void {
    if (this.uFirstname !== '') { this.u.firstName = this.uFirstname; }
    if (this.uLastname !== '') { this.u.lastName = this.uLastname; }
    if (this.uPassword !== '') { this.u.password = this.uPassword; }
    if (this.uEmail !== '') { this.u.email = this.uEmail; }
    sessionStorage.setItem('currentUser', JSON.stringify(this.u));
    this.us.updateProfile(this.u);
    alert('Successfully Updated Profile Information!');
//    location.reload();
  }
}
