import { Brewery } from './brewery';

export class User {
    public id: number;
    public username: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public favorites: Brewery[];
}
