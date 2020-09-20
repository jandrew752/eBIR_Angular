import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brewery } from '../models/brewery';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

  breweryList: Brewery[] = [];

  constructor(private http: HttpClient) {}

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
    const list = await this.breweryByZipcode(zipcode);
    for (const brewery of list) {
      const b = this.parseBreweryObject(brewery);
      this.breweryList.push(b);
    }
  }

  async insertBreweryByState(state: string): Promise<void> {
    this.breweryList = [];
    const list = await this.breweryByState(state);
    for (const brewery of list) {
      const b = this.parseBreweryObject(brewery);
      this.breweryList.push(b);
    }
  }

  async insertBreweryByName(name: string): Promise<void> {
    this.breweryList = [];
    const list = await this.breweryByName(name);
    for (const brewery of list) {
      const b = this.parseBreweryObject(brewery);
      this.breweryList.push(b);
    }
  }

  public breweryByName(name: string): Promise<any[]> {
    try {
      return this.http.get<any[]>('https://api.openbrewerydb.org/breweries/search?query=' + name).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

//  async public zipcodeDistance(zipcode1: string | number, zipcode2: string | number)

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
      b.updatedAt = o.updated_at;

    } catch (error) {
      console.log(error);
      console.log('Invalid object. Could not create brewery object');
      return null;
    }

    return b;
  }

}
