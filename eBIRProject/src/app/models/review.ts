import { User } from './user';
import { Brewery } from './brewery';
import { NumberSymbol } from '@angular/common';

export class Review {
    public submitter: User;
    public brewery: number;
    public rating: number;
    public reviewText: string;
}
