import { Component, OnInit } from '@angular/core';
import { Brewery } from '../../models/brewery';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { BreweryService } from 'src/app/services/brewery.service';

@Component({
  selector: 'app-brewerypage',
  templateUrl: './brewerypage.component.html',
  styleUrls: ['./brewerypage.component.css']
})
export class BrewerypageComponent implements OnInit {
  private id: string;
  public brewery: Brewery;
  private clickCounter: number = 0;
  public reviewText: string = "";
  public footerVisible:boolean = true;

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private bs: BreweryService) {
    // get id from route param
    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    // populate data on constructor
    this.getBrewery();
  }

  ngOnInit(): void {

  }

  async getBrewery() {
    let response = await this.http.get("https://api.openbrewerydb.org/breweries/" + this.id).toPromise();
    this.brewery = this.bs.parseBreweryObject(response);
  }

  clearText() {
    // only clear text if it's the first time they've clicked in the box
    // ie only clear "Write a review!"
    if (this.clickCounter == 0) {
      document.getElementById("review_text").innerHTML = "";
    }
    this.clickCounter++;
  }

  // open confirmation modal
  // set reviewText
  // create review object
  reviewSubmitBtn() {
    console.log(this.clickCounter);
    // check to make sure they've actually put something in
    if (this.clickCounter > 0) {
      this.footerVisible = true;
      // cast to HTMLTextArea to get .value
      this.reviewText = (<HTMLTextAreaElement>document.getElementById("review_text")).value;
      console.log(this.footerVisible);
    } else {
      this. footerVisible = false;
      this.reviewText = "Please write a review before submitting!";
      // set visibility of submit buttons in modal footer
    }

  }

  // send actual request
  // [{user}, {brewery}, {review}]
  submitReview() {

  }

  async addToFavorites() {
    let bString = JSON.stringify(this.brewery);

    // placeholder --------
    let temp = { id: 1, name: "bob" }
    sessionStorage.setItem("currentUser", JSON.stringify(temp));
    //-----------

    let postJSON = [JSON.parse(sessionStorage.getItem("currentUser")), this.brewery];
    let postString = JSON.stringify(postJSON);

    console.log(postString);

    // placeholder --------------
    console.log(postJSON)
    let response = await this.http.post(environment.API_URL + "/user/favorites", postString);
    // --------------------------

  }

}
