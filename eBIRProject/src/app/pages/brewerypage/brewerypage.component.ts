import { Component, OnInit } from '@angular/core';
import { Brewery } from '../../models/brewery';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment';

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
    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.getBrewery();
  }

  ngOnInit(): void {

  }

  async getBrewery(){
    console.log(this.id);
    let response = await this.http.get("https://api.openbrewerydb.org/breweries/" + this.id).toPromise();
    let test = JSON.stringify(response);
    this.brewery = JSON.parse(test);
    console.log(this.brewery);
    this.formattedDate = this.brewery.updated_at.toString();
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
    console.log(postString)
    let response = await this.http.post(environment.API_URL+environment.PORT + "/addfavorite", postString);
    // --------------------------

  }

}
