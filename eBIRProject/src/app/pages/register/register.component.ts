import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public u: User = new User();
  public username = '';
  public password = '';
  public confirmpassword: '';
  public firstname = '';
  public lastname = '';
  public email = '';

  constructor(private us: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  async register(): Promise<void> {
    if (this.password !== this.confirmpassword) {
      alert('Passwords do not match');
    }
    else {
      this.u.firstName = this.firstname;
      this.u.lastName = this.lastname;
      this.u.username = this.username;
      this.u.password = this.password;
      this.u.email = this.email;

      if (await this.us.register(this.u)) {
        sessionStorage.setItem('currentUser', JSON.stringify(this.us.getUser()));
        this.router.navigateByUrl('/home');
      }
      else {
        alert('Problem registering account!');
      }
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/login');
  }

}
