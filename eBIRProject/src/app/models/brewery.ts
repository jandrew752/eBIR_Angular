import { Review } from './review';

export class Brewery {

    public id: number;
    public name: string;
    public street: string;
    public breweryType: string;
    public city: string;
    public state: string;
    public postalCode: string;
    public country: string;
    public longitude: number;
    public latitude: number;
    public phone: string;
    public websiteUrl: string;
    public updatedAt: Date;

    public rating: number;
    public reviews: Review[];
}
