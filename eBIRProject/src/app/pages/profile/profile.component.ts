import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brewery } from 'src/app/models/brewery';
import { User } from 'src/app/models/user';
import { BreweryService } from 'src/app/services/brewery.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  u: User;
  closeResult = '';
  uFirstname = '';
  uLastname = '';
  uPassword = '';
  uEmail = '';
  isOpen = false;
  favoriteBreweryList: Brewery[] = [];
  editedList: Brewery[] = [];

  constructor(private bs: BreweryService, private us: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // if (sessionStorage.getItem('currentUser') == null) {
    //   this.router.navigateByUrl('/login');
    //   alert('Please login');
    // }

    // this.favoritesList();
    this.u = JSON.parse(sessionStorage.getItem('currentUser'));
    this.us.initNull(this.u);
    this.favoritesList();
  }

  async favoritesList(): Promise<void> {
    // favorites is already a field in user, this isn't really necessary I don't think?
    // this.u.favorites = await this.us.getFavoritesList(this.u.username);

    // console.log(this.u.favorites[0]);
    this.u.favorites.forEach(async f => {
      this.favoriteBreweryList.push(await this.bs.getSingleBrewery(f));
    });
      // this.u.favorites = new Set();
  }

  async removeFavorite(id: number): Promise<void> {
    this.u.favorites = this.u.favorites.filter(element => element != id);
    console.log(this.u.favorites);

    let temp = (await this.us.updateUser(this.u)).toPromise();

    let tempUser = <User> await temp;
    console.log(tempUser);
    if (tempUser != null) { // success
      alert('Successfully deleted brewery from favorites list');
      this.u = tempUser;
      sessionStorage.setItem("currentUser", JSON.stringify(tempUser));
    } else { // problem
      alert('Problem deleting brewery from favorites list')
    }
    location.reload();
  }

  toBreweryPage(id: number): void {
    console.log(id);
    this.router.navigateByUrl('/brewery/' + id);
  }

  goBack(): void {
    this.router.navigateByUrl('/home');
  }

  async update(): Promise<void> {
    // Have to do some special stuff with password, don't want to store plaintext
    // also the password field is actually the passhash
    // if (this.uPassword.trim() !== '') {
    //   this.u.password = this.uPassword;
    // } else { this.u.password = ''; }

    // might be better to update our user object/session storage based on what the server sends back
    // esp since we need to do it anyways for pass hashing
    // instead of using our u based on session storage, I'll use a temporary user obj

    // if they don't change, we just pass the value from the currentUser
    let temp: User = new User();
    temp.username = this.u.username;
    if (this.uFirstname.trim() !== '') {
      temp.firstName = this.uFirstname;
    } else {
      temp.firstName = this.u.firstName;
    }
    if (this.uLastname.trim() !== '') {
       temp.lastName = this.uLastname;
    } else {
      temp.lastName = this.u.lastName;
    }

    this.us.initNull(temp);
    temp.favorites = this.u.favorites;
    // Spring maps empty arrays to null/no entries in DB, so we need to check if favorites was null
    // and reinit later it is
    let noFavorites:boolean = (temp.favorites.length < 1);

    // maybe also check regex email on client side?
    if (this.uEmail.trim() !== '') {
      temp.email = this.uEmail;
    } else {
      temp.email = this.u.email;
    }

    let changedPass:boolean = false;
    if (this.uPassword.trim().length > 0) {
      temp.password = this.uPassword;
      changedPass = true;
    } else {
      temp.password = this.u.password;
    }


    // add favorites - temporary. openbreweryDB is down
    // temp.favorites = [];
    // temp.favorites.push(1);
    // temp.favorites.push(10);
    // console.log(temp);


    // if pass changed, use put
    // otherwise, post
    let resp;
    if (changedPass) {
      // for some reason, favorites array doesnt parse properly if I don't do obj > str > obj
      // ¯\_(ツ)_/¯
      resp = await this.http.put(environment.API_URL + '/user/', JSON.parse(JSON.stringify(temp)), {
        withCredentials: true
      }).toPromise();
    } else {
      console.log(JSON.stringify(temp));
      resp = await this.http.post(environment.API_URL + '/user/', JSON.parse(JSON.stringify(temp)), {
        withCredentials: true
      }).toPromise();
    }

    console.log(resp);
    console.log(typeof(resp))
    // check if resp is valid user object - server sends null if it failed
    if ((await resp) != null) {
      resp = this.us.initNull(<User>resp);
      this.u = resp;

      console.log("Returned object: " + resp);
      sessionStorage.setItem("currentUser", JSON.stringify(this.u));
      alert('Successfully Updated Profile Information!');
    } else {
      // user obj in field and in session storage only changes on success
      alert('Problem updating profile!');
    }
      // sessionStorage.setItem('currentUser', JSON.stringify(this.us.getUser()));
      // location.reload();
  }
}
