import { Injectable } from '@angular/core';
import { Key } from 'protractor';
import { Brewery } from '../models/brewery';
import { Review } from '../models/review';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

// testing
//  {Server} from "miragejs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

  breweryList: Brewery[] = [];
  abbreviatedState = '';

  stateDictionary: { [index: string]: string} = {};

  constructor(private http: HttpClient) {}

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

  async insertBrewery(): Promise<void> {
    this.breweryList = [];
    const list = await this.getBrewery(20);
    for (const brewery of list) {
      const b = this.parseBreweryObject(brewery);
      this.breweryList.push(b);
    }
  }

  async insertBreweryByZipcode(zipcode: number | string): Promise<void> {
    this.breweryList = [];
    const stateZipList = await this.zipcodeByState(this.abbreviatedState);
    console.log(stateZipList);
    const list = await this.breweryByZipcode(zipcode);
    for (const brewery of list) {
      const b = this.parseBreweryObject(brewery);
      this.breweryList.push(b);
    }
  }

  async insertBreweryByState(state: string): Promise<void> {
    this.initStateDict();
    this.breweryList = [];
    const list = await this.breweryByState(state);
    for (const brewery of list) {
      const b = this.parseBreweryObject(brewery);
      this.breweryList.push(b);
      // console.log(b);
    }
    this.abbreviatedState = this.stateDictionary[state.split(' ').join('_')];
    console.log(this.abbreviatedState);
  }

  async insertBreweryByName(name: string): Promise<void> {
    this.breweryList = [];
    const list = await this.breweryByName(name);
    if (list === []) { this.insertBrewery(); }
    else {
      for (const brewery of list) {
        const b = this.parseBreweryObject(brewery);
        this.breweryList.push(b);
      }
    }
  }

  public breweryByName(name: string): Promise<any[]> {
    if (name === '') { return this.getBrewery(20); }
    try {
      return this.http.get<any[]>('https://api.openbrewerydb.org/breweries/search?query=' + name).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  public zipcodeByState(state: string): Promise<any> {
    try {
      const apiKey = 'gqIk9VeLMkMrwhvM2fjrID47hls8hzpTjCaAQ72wPAPKctYZs7C6slFAiXd1Yfp7';
      return this.http.get<any>(
        'https://www.zipcodeapi.com/rest/' + apiKey + '/state-zips.json/' + state).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  public zipcodeDistance(zipcode1: string | number, zipcode2: string | number): Promise<any> {
    try {
      const apiKey = 'gqIk9VeLMkMrwhvM2fjrID47hls8hzpTjCaAQ72wPAPKctYZs7C6slFAiXd1Yfp7';
      return this.http.get<any>(
        'https://www.zipcodeapi.com/rest/<' + apiKey + '>/distance.json/' + zipcode1 + '/' + zipcode2 + '/mile').toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  public breweryByZipcode(zipcode: string | number): Promise<any[]> {
    try {
      return this.http.get<any[]>('https://api.openbrewerydb.org/breweries?by_postal=' + zipcode).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  public breweryByState(state: string): Promise<any[]> {
    try {
      return this.http.get<any[]>('https://api.openbrewerydb.org/breweries?by_state=' + state).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  public getBrewery(id: string | number): Promise<any[]> {
    try {
      return this.http.get<any[]>('https://api.openbrewerydb.org/breweries?per_page=' + id).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async getSingleBrewery(id: number): Promise<any> {
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

  async getReviews(b: Brewery) {
    return this.http.get(environment.API_URL + "reviews/" + b.id);
  }

  async submitReview(r: Review) {
    return await this.http.put(environment.API_URL + "review", JSON.stringify(r)).toPromise();
  }

}
