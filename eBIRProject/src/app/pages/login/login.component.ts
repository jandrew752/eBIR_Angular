import { UserService } from './../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Brewery } from 'src/app/models/brewery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';
  public u: User = new User();

  constructor(private us: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  confirm(): void {
//  this.us.login(username, password);

// Delete sample code and uncomment above code when connection to backend attempted/completed
    this.u.id = 1;
    this.u.firstName = 'Julien';
    this.u.lastName = 'Andrew';
    this.u.username = 'jandrew';
    this.u.password = 'qwerty';
    this.u.email = 'jandrew@gmail.com';
    this.u.favorites = new Set();

    sessionStorage.setItem('currentUser', JSON.stringify(this.u));
    this.router.navigateByUrl('/home');
  }

  toRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
