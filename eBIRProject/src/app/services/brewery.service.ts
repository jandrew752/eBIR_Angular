import { Injectable } from '@angular/core';
import { Key } from 'protractor';
import { Brewery } from '../models/brewery';
import { Review } from '../models/review';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

  breweryList: Brewery[] = [];
  abbreviatedState = '';
  page: number = 1;
  query: string = '';

  stateDictionary: { [index: string]: string} = {};

  constructor(private http: HttpClient) {}

  // Initializing state dictionary
  public initStateDict(): void {
    if (this.stateDictionary === {}) {return; }
    this.stateDictionary.alaska = 'AK';
    this.stateDictionary.alabama = 'AL';
    this.stateDictionary.arkansas = 'AR';
    this.stateDictionary.arizona = 'AZ';
    this.stateDictionary.california = 'CA';
    this.stateDictionary.colorado = 'CO';
    this.stateDictionary.connecticut = 'CT';
    this.stateDictionary.delaware = 'DE';
    this.stateDictionary.florida = 'FL';
    this.stateDictionary.georgia = 'GA';
    this.stateDictionary.hawaii = 'HI';
    this.stateDictionary.iowa = 'IA';
    this.stateDictionary.idaho = 'ID';
    this.stateDictionary.illinois = 'IL';
    this.stateDictionary.indiana = 'IN';
    this.stateDictionary.kansas = 'KS';
    this.stateDictionary.kentucky = 'KY';
    this.stateDictionary.louisiana = 'LA';
    this.stateDictionary.massachusetts = 'MA';
    this.stateDictionary.maryland = 'MD';
    this.stateDictionary.maine = 'ME';
    this.stateDictionary.michigan = 'MI';
    this.stateDictionary.minnesota = 'MN';
    this.stateDictionary.missouri = 'MO';
    this.stateDictionary.mississippi = 'MS';
    this.stateDictionary.montana = 'MT';
    this.stateDictionary.north_carolina = 'NC';
    this.stateDictionary.north_dakota = 'ND';
    this.stateDictionary.nebraska = 'NE';
    this.stateDictionary.new_hampshire = 'NH';
    this.stateDictionary.new_jersey = 'NJ';
    this.stateDictionary.new_mexico = 'NM';
    this.stateDictionary.nevada = 'NV';
    this.stateDictionary.new_york = 'NY';
    this.stateDictionary.ohio = 'OH';
    this.stateDictionary.oklahoma = 'OK';
    this.stateDictionary.oregon = 'OR';
    this.stateDictionary.pennsylvania = 'PA';
    this.stateDictionary.rhode_island = 'RI';
    this.stateDictionary.south_carolina = 'SC';
    this.stateDictionary.south_dakota = 'SD';
    this.stateDictionary.tennessee = 'TN';
    this.stateDictionary.texas = 'TX';
    this.stateDictionary.utah = 'UT';
    this.stateDictionary.virginia = 'VA';
    this.stateDictionary.vermont = 'VT';
    this.stateDictionary.washington = 'WA';
    this.stateDictionary.wisconsin = 'WI';
    this.stateDictionary.west_virginia = 'WV';
    this.stateDictionary.wyoming = 'WY';
  }

  async nextPage() {
    // if there's no more in the list, don't keep adding to the page
    if (this.breweryList.length > 0) {
      this.page++;
      this.getBrewery;
    }
  }

  async previousPage() {
    if (this.page > 1) {
      this.page--;
    }
    this.getBrewery;
  }

  public setQuery(state: string, zipcode: string | number, name: string) {
    let stateQ: string = 'by_state=';
    let zipcodeQ: string = 'by_postal=';
    let nameQ: string = 'by_name=';
    // only if values aren't null/undefined
    // prevents things like "by_state=undefined"
    if (state) {
      stateQ += state;
    }
    if (zipcode) {
      zipcodeQ += zipcode;
    }
    if (name) {
      nameQ += name;
    }

    this.query = stateQ + '&' + nameQ + '&' + zipcodeQ;

  }

  public async getBrewery(): Promise<Brewery[]> {
    try {
      console.log(this.query + '&page=' + this.page);
      this.breweryList = await this.http.get<any[]>('https://api.openbrewerydb.org/breweries?per_page=20&' + this.query + '&page=' + this.page).toPromise();
      return this.breweryList;
    } catch (error) {
      console.log(error);
    }
  }

  async getSingleBrewery(id: number | string): Promise<any> {
    try {
      return await this.http.get('https://api.openbrewerydb.org/breweries/' + id).toPromise();
    } catch(error) {
      console.log(error);
    }
  }

  parseBreweryObject(o: any): Brewery {
    const b: Brewery = new Brewery();

    try {
      b.id = o.id;
      b.name = o.name;
      b.street = o.street;
      b.breweryType = o.brewery_type;
      b.city = o.city;
      b.state = o.state;
      b.postalCode = o.postal_code;
      b.country = o.country;
      b.longitude = o.longitude;
      b.latitude = o.latitude;
      b.phone = o.phone;
      b.websiteUrl = o.website_url;
      b.updatedAt = o.updated_at.valueOf();

    } catch (error) {
      console.log(error);
      console.log('Invalid object. Could not create brewery object');
      return null;
    }

    return b;
  }

  async getReviews(b: Brewery): Promise<Review[]> {
    return this.http.get<Review[]>(environment.API_URL + '/brewery/' + b.id + '/reviews').toPromise();
  }

  async submitReview(r: Review) {
    return await this.http.post<Review>(environment.API_URL + '/review', r).toPromise();
  }
}