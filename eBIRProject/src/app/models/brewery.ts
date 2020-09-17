import { Review } from './review';

export class Brewery {

    public id: number;
    public name: string;
    public street: string;
    public brewery_type: string;
    public city: string;
    public state: string;
    public postal_code: string;
    public country: string;
    public longitude: number;
    public latitude: number;
    public phone: string;
    public website_url: string;
    public updated_at: Date;

    public rating: number;
    public reviews: Review[];
}

