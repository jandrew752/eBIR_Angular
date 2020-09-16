import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public username = '';
  public password = '';
  public confirmpassword: '';
  public firstname = '';
  public lastname = '';
  public email = '';

  constructor(private us: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  register(): void {
//    this.us.register(username, password, confirmpassword, firstname, lastname, email);
    this.router.navigateByUrl('/home');
  }

  goBack(): void {
    this.router.navigateByUrl('/login');
  }

}
