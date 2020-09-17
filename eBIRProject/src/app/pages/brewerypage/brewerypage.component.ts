import { Component, OnInit } from '@angular/core';
import { Brewery } from '../../models/brewery';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-brewerypage',
  templateUrl: './brewerypage.component.html',
  styleUrls: ['./brewerypage.component.css']
})
export class BrewerypageComponent implements OnInit {
  private id: string;
  public brewery: Brewery;
  public formattedDate: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    // get id from route param
    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    // populate data on constructor
    this.getBrewery();
  }

  ngOnInit(): void {

  }

  async getBrewery(){
    let response = await this.http.get("https://api.openbrewerydb.org/breweries/" + this.id).toPromise();
    this.brewery = <Brewery> response;
    this.formattedDate = this.brewery.updated_at;
  }

  async addToFavorites() {
    console.log("added");
    let bString = JSON.stringify(this.brewery);

    // placeholder --------
    let temp = {id:1, name:"bob"}
    sessionStorage.setItem("currentUser", JSON.stringify(temp));
    //-----------

    let postJSON = [JSON.parse(sessionStorage.getItem("currentUser")), this.brewery];
    let postString = JSON.stringify(postJSON);

    // console.log(postJSON);
    // console.log(JSON.parse(postString));

    // placeholder --------------
    console.log(postJSON)
    let response = await this.http.post(environment.API_URL+environment.PORT + "/addfavorite", postString);
    // --------------------------

  }

}
