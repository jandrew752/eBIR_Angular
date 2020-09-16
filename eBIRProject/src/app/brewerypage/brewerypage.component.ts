import { Component, OnInit } from '@angular/core';
import { Brewery } from '../models/brewery';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-brewerypage',
  templateUrl: './brewerypage.component.html',
  styleUrls: ['./brewerypage.component.css']
})
export class BrewerypageComponent implements OnInit {
  public brewery: Brewery;
  public formattedDate: string;

  constructor(http: HttpClient) { 
    // TODO format date string
    this.formattedDate = this.brewery.updatedAt.toString();

    
  }

  ngOnInit(): void {

  }

}
