import { User } from './user';
import { Brewery } from './brewery';

export class Review {
    public submitter: User;
    public brewery: Brewery;
    public reviewText: string;
}