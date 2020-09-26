import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brewery } from 'src/app/models/brewery';
import { BreweryService } from 'src/app/services/brewery.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  u: User = JSON.parse(sessionStorage.getItem('currentUser'));
  favoritesList: Brewery[] = [];
  breweryList: Brewery[] = [];
  editedList: Brewery[] = [];
  id: number = null;
  zipcode: number;
  name = '';
  breweryType = '';
  phone = '';
  street = '';
  city = '';
  state = '';
  inputState = '';
  inputName = '';
  inputZipcode: number;
  postalCode = '';
  websiteUrl = '';

  constructor(private bs: BreweryService, private us: UserService, private router: Router, private http: HttpClient, private ms: MapService) {}

  ngOnInit(): void {
    // if (sessionStorage.getItem('currentUser') == null) {
    //   this.router.navigateByUrl('/login');
    //   alert('Please login');
    // }
    // this.bs.setQuery(this.inputState, this.inputZipcode, this.inputName);
    this.updateBList();
  }

  toBreweryPage(): void {
    console.log(this.id);
    this.router.navigateByUrl('/brewery/' + this.id);
  }

  toProfile(): void {
    this.bs.breweryList = [];
    this.router.navigateByUrl('/profile');
  }

  async updateBList() {
    this.bs.setQuery(this.inputState, this.inputZipcode, this.inputName);
    this.breweryList = await this.bs.getBrewery();
    console.log(this.breweryList);
  }

  // toList(): void {
  //   this.bs.insertBrewery();
  //   this.breweryList = this.bs.breweryList;
  // }

  /*
  nameSearch(): void {
    this.inputName = this.inputName.toLowerCase();
    this.inputName.split(' ').join('_');
    this.bs.insertBreweryByName(this.inputName);
    this.breweryList = this.bs.breweryList;
    this.inputState = '';
    this.inputZipcode = null;
  }

  stateSearch(): void {
    this.inputState = this.inputState.toLowerCase();
    this.inputState.split(' ').join('_');
    this.bs.insertBreweryByState(this.inputState);
    this.breweryList = this.bs.breweryList;
    this.inputName = '';
    this.inputZipcode = null;
    this.ms.setCenter();
  }

  zipcodeSearch(): void {
    this.bs.insertBreweryByZipcode(this.inputZipcode);
    this.breweryList = this.bs.breweryList;
    this.inputState = '';
    this.inputName = '';
  }
  */

  add(id: number): void {
    const b = this.favoriteSelect(id);
    if (b === null) {
      alert('Problem Adding Brewery to Favorites');
    } else {
    this.favoritesList.push(b);
    }
    //this.u.favorites = this.favoritesList;

    console.log(this.u);
    sessionStorage.setItem('currentUser', JSON.stringify(this.u));
    alert('Successfully Added to Favorites!');

  }

  // since breweries in backend are just int[], we have to populate brewery[] on front end with public API
  async updateFavorites() {
    for (let id of this.u.favorites) {
      this.favoritesList.push(await this.bs.getSingleBrewery(id));
    }
  }

  favoriteSelect(id: number): Brewery {
    this.editedList = this.breweryList;
    let brewery: Brewery = null;
    this.editedList.forEach(b => {
      if (b.id === id) {
        this.us.addFavorite(this.u, b.id);
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
        this.id = b.id;
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
