import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // clear session storage before sending back to home page
  logout(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  // send back to home page
  goHome(): void {
    this.router.navigateByUrl('/home')
  }

}
