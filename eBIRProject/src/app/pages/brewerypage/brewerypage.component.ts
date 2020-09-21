import { Component, OnInit } from '@angular/core';
import { Brewery } from '../../models/brewery';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'
import { DatePipe } from '@angular/common';
import { BreweryService } from 'src/app/services/brewery.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Review } from 'src/app/models/review';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-brewerypage',
  templateUrl: './brewerypage.component.html',
  styleUrls: ['./brewerypage.component.css']
})
export class BrewerypageComponent implements OnInit {
  private id: string;
  public brewery: Brewery;
  public reviews: Review[];
  private clickCounter: number = 0;
  public reviewText: string = "";
  public footerVisible:boolean = true;
  public hasSubmittedReview:boolean = false;
  public isFavorite:boolean = false;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute,
    private bs: BreweryService, private us: UserService) {
    // get id from route param
    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    // populate data on constructor
    this.populateData();



    // check if this brewery is already a favorite or if user already has a review
    let user = JSON.parse(sessionStorage.getItem("currentUser"));

    // uncomment after getFavoritesList is done
    // let favorites: Brewery[] = us.getFavoritesList(user.id);

    // // if brewery is already in favorites
    // for (let b of favorites) {
    //   if (b.id == this.brewery.id) {
    //     this.isFavorite = true;
    //     break;
    //   }
    // }

    // placeholder, remove when done
      user = {
        id : 1,
        name : "bob"
      }
      sessionStorage.setItem("currentUser", JSON.stringify(user));
    // ----------
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser') == null) {
      this.router.navigateByUrl('/login');
      alert('Please login');
    }
  }

 async populateData() {
    const numID: number = parseInt(this.id.substring(1));
    let temp = await this.bs.getSingleBrewery(numID);
    this.brewery = this.bs.parseBreweryObject(temp);

    // get reviews from DB
    const obs = await this.bs.getReviews(this.brewery);
    obs.subscribe(r => {
      this.reviews.push(<Review> r);
    })
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
    } else {
      this. footerVisible = false;
      this.reviewText = "Please write a review before submitting!";
    }

    console.log(this.hasSubmittedReview);
  }

  // send actual request
  // [{user}, {brewery}, {review}]
  async submitReview() {
    let user = JSON.parse(sessionStorage.getItem("currentUser"));
      // create review object
      let review: Review = {
        "submitter" : user,
        "brewery" : this.brewery,
        "reviewText" : this.reviewText
      };

      this.hasSubmittedReview = true; // move after HTTP req once backend is ready
      // send put req
      this.bs.submitReview(review);
      //this.hasSubmittedReview = true;
  }

  async toggleFavorites() {
    let bString = JSON.stringify(this.brewery);

    let postJSON = [JSON.parse(sessionStorage.getItem("currentUser")), this.brewery];
    let postString = JSON.stringify(postJSON);

    // console.log(postJSON)
    this.isFavorite = !this.isFavorite; // move this after HTTP req once backend is ready
    let response = await this.http.post(environment.API_URL + "/user/favorites", postString).toPromise();
  }

}
