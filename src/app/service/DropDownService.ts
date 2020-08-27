import { Injectable } from '@angular/core';
import { Country } from '../models/Country';
import { State } from '../models/State';

@Injectable()
export class DropDownService {

    getCountries() {
        return [
            new Country(1, 'India'),
            new Country(2, 'Australia'),
        ];
    }

    getStates() {
        return [
            new State(1, 1, 'Andra Pradesh'),
            new State(2, 1, 'Arunachal Pradesh'),
            new State(3, 1, 'Assam'),
            new State(4, 1, 'Bihar'),
            new State(5, 1, 'Tamil Nadu'),
            new State(6, 2, 'New South Wales'),
            new State(7, 2, 'Northern Territory'),
            new State(8, 2, 'Queensland')
        ];
    }

}