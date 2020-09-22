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

  async confirm(): Promise<void> {
    
    // if logged in
    if (await this.us.login(this.username, this.password)) {
      sessionStorage.setItem('currentUser', JSON.stringify(this.u));
      this.router.navigateByUrl('/home');
    } else { // not logged in
      alert('Problem logging into account!');
    }
    // this.u.firstName = 'Julien';
    // this.u.lastName = 'Andrew';
    // this.u.username = 'jandrew';
    // this.u.password = 'qwerty';
    // this.u.email = 'jandrew@gmail.com';
      
  }

  toRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
