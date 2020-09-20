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

  public u: User = JSON.parse(sessionStorage.getItem('currentUser'));
  closeResult = '';
  uFirstname = '';
  uLastname = '';
  uPassword = '';
  uEmail = '';
  isOpen = false;

  constructor(private us: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.favoritesList();
  }

  async favoritesList(): Promise<void> {
//    this.u.favorites = await this.us.getFavoritesList(this.u.id);
      this.u.favorites = [];
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
//  us.updateProfile(this.firstname, this.lastname, this.password, this.email);
    alert('Successfully Updated Profile Information!');
    location.reload();
  }
}
