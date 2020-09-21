import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brewery } from 'src/app/models/brewery';
import { BreweryService } from 'src/app/services/brewery.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  u: User = JSON.parse(sessionStorage.getItem('currentUser'));
  favoritesList: Set<Brewery> = new Set();
  breweryList: Brewery[] = [];
  editedList: Brewery[] = [];
  search = '';
  zipcode: number;
  name = '';
  breweryType = '';
  phone = '';
  street = '';
  city = '';
  state = '';
  inputState = '';
  inputName = '';
  inputZipcode = '';
  postalCode = '';
  websiteUrl = '';

  constructor(private bs: BreweryService, private us: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser') == null) {
      this.router.navigateByUrl('/login');
      alert('Please login');
    }
    this.breweryList = [];
    this.toList();
  }

  toProfile(): void {
    this.bs.breweryList = [];
    this.router.navigateByUrl('/profile');
  }

  toList(): void {
    this.bs.insertBrewery();
    this.breweryList = this.bs.breweryList;
  }

  nameSearch(): void {
    this.inputName = this.inputName.toLowerCase();
    this.inputName.split(' ').join('_');
    this.bs.insertBreweryByName(this.inputName);
    this.breweryList = this.bs.breweryList;
  }

  stateSearch(): void {
    this.inputState = this.inputState.toLowerCase();
    this.inputState.split(' ').join('_');
    this.bs.insertBreweryByState(this.inputState);
    this.breweryList = this.bs.breweryList;
  }

  zipcodeSearch(): void {
    this.bs.insertBreweryByZipcode(this.inputZipcode);
    this.breweryList = this.bs.breweryList;
  }

  add(id: number): void {
    const b = this.favoriteSelect(id);
    if (b === null) {
      alert('Problem Adding Brewery to Favorites');
    } else {
    this.favoritesList.add(b);
    this.u.favorites = this.favoritesList;
    console.log(this.u);
    sessionStorage.setItem('currentUser', JSON.stringify(this.u));
    alert('Successfully Added to Favorites!');
    }
  }

  favoriteSelect(id: number): Brewery {
    this.editedList = this.breweryList;
    let brewery: Brewery = null;
    this.editedList.forEach(b => {
      if (b.id === id) {
//      this.us.addFavorite(this.u, b);
        brewery = b;
      }
    });
    return brewery;
  }

  breweryInfo(id: number): void {
    this.editedList = this.breweryList;
    this.editedList.forEach(b => {
      if (b.id === id) {
        console.log(b);
        this.name = b.name;
        this.breweryType = b.breweryType;
        this.phone = b.phone;
        this.street = b.street;
        this.city = b.city;
        this.state = b.state;
        this.postalCode = b.postalCode;
        this.websiteUrl = b.websiteUrl;
      }
    });
  }
}
