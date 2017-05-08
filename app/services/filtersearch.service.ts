import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Meeting } from '../classes/meeting';

@Injectable()
export class FiltersearchService {

    constructor(private http: Http) {}

    search(term: string): Observable<Meeting[]> {
        return this.http
            .get(`app/meeting/?title=${term}`)
            .map(response => response.json().data as Meeting[]);
    }

    filter(t: string): Observable<Meeting[]> {
        return this.http
            .get(`app/meeting/?place=${t}`)
            .map(response => response.json().data as Meeting[]);
    }

}