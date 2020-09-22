import { Component, OnInit } from '@angular/core';
import { Brewery } from '../../models/brewery';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BreweryService } from 'src/app/services/brewery.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Review } from 'src/app/models/review';
import { environment } from 'src/environments/environment.prod';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-brewerypage',
  templateUrl: './brewerypage.component.html',
  styleUrls: ['./brewerypage.component.css']
})
export class BrewerypageComponent implements OnInit {
  private id: string;
  public brewery: Brewery;
  public reviews: Review[];
  private clickCounter = 0;
  public reviewText = '';
  public footerVisible = true;
  public hasSubmittedReview = false;
  public isFavorite = false;
  public rating = 0;
  public convertRating = '';
  public ratingText = '';
  ratings: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ratingsForm = this.fb.group({
    rating: []
  });

  constructor(public fb: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute,
              private bs: BreweryService, private us: UserService) {
    // get id from route param
    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    // populate data on constructor
    this.populateData();



    // check if this brewery is already a favorite or if user already has a review
    const user = JSON.parse(sessionStorage.getItem('currentUser'));

    // uncomment after getFavoritesList is done
    // let favorites: Brewery[] = us.getFavoritesList(user.id);

    // // if brewery is already in favorites
    // for (let b of favorites) {
    //   if (b.id == this.brewery.id) {
    //     this.isFavorite = true;
    //     break;
    //   }
    // }

  }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser') == null) {
      this.router.navigateByUrl('/login');
      alert('Please login');
    }
  }

  onSubmit(): void {
    alert(JSON.stringify(this.ratingsForm.value));
  }

 async populateData() {
    const numID: number = parseInt(this.id.substring(1));
    const temp = await this.bs.getSingleBrewery(numID);
    this.brewery = this.bs.parseBreweryObject(temp);

    // get reviews from DB
    const obs = await this.bs.getReviews(this.brewery);
    obs.subscribe(r => {
      this.reviews.push(r as Review);
    });
 }

  clearText() {
    // only clear text if it's the first time they've clicked in the box
    // ie only clear "Write a review!"
    if (this.clickCounter == 0) {
      document.getElementById('review_text').innerHTML = '';
    }
    this.clickCounter++;
  }

  // open confirmation modal
  // set reviewText
  // create review object
  reviewSubmitBtn(): void {

    // This is to get the rating from the ratingsForm.value object, if better way please replace
    this.convertRating = JSON.stringify(this.ratingsForm.value).charAt(11) + JSON.stringify(this.ratingsForm.value).charAt(12);
    // tslint:disable-next-line: radix
    if (isNaN(parseInt(this.convertRating))) {this.rating = parseInt(this.convertRating.charAt(0));}
    // tslint:disable-next-line: radix
    else { this.rating = parseInt(this.convertRating); }


    console.log(this.clickCounter);
    // check to make sure they've actually put something in
    const emptyTest = ( document.getElementById('review_text') as HTMLTextAreaElement).value.trim();
    if (this.clickCounter > 0 && !isNaN(this.rating) &&  emptyTest !== '') {
      this.footerVisible = true;
      // cast to HTMLTextArea to get .value
      this.ratingText = 'My Rating: ' + this.rating;
      this.reviewText = ( document.getElementById('review_text') as HTMLTextAreaElement).value;
    }
    else {
      if (isNaN(this.rating)) {
        this. footerVisible = false;
        this.ratingText = '';
        this.reviewText = 'Please select a rating before submitting!';
      }
      else {
        this. footerVisible = false;
        this.ratingText = '';
        this.reviewText = 'Please write a review before submitting!';
      }
    }

    console.log(this.hasSubmittedReview);
  }

  // send actual request
  // [{user}, {brewery}, {review}]
  submitReview(): void {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
      // create review object
    const review: Review = {
        submitter : user,
        brewery : this.brewery,
        reviewText : this.reviewText
      };

    console.log(review);

    this.hasSubmittedReview = true; // move after HTTP req once backend is ready
      // send put req
    this.bs.submitReview(review);
      // this.hasSubmittedReview = true;
  }

  async toggleFavorites() {
    const bString = JSON.stringify(this.brewery);

    const postJSON = [JSON.parse(sessionStorage.getItem('currentUser')), this.brewery];
    const postString = JSON.stringify(postJSON);

    // console.log(postJSON)
    this.isFavorite = !this.isFavorite; // move this after HTTP req once backend is ready
    const response = await this.http.post(environment.API_URL + '/user/favorites', postString).toPromise();
  }

}
