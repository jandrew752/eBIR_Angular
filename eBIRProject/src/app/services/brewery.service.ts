import { Injectable } from '@angular/core';
import { Brewery } from '../models/brewery';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

  constructor() {}

  parseBreweryObject(o: any): Brewery {
    let b: Brewery = new Brewery();

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
      console.log("Invalid object. Could not create brewery object")
      return null;
    }

    return b;
  }

}
