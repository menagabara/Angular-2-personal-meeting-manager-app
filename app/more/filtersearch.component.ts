import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { FiltersearchService } from '../services/filtersearch.service';
import { Meeting } from '../classes/meeting';

@Component({
    moduleId: module.id,
    selector: 'filter-search',
    templateUrl: 'filtersearch.component.html',
    providers: [FiltersearchService]
})

export class FilterearchComponent implements OnInit {
    m: Observable<Meeting[]>;
    f: Observable<Meeting[]>;
    public curSearch: string;

    private searchTerms = new Subject<string>();
    private filterTerms = new Subject<string>();

    constructor(
        private filtersearchService: FiltersearchService,
        private router: Router) {}

    search(term: string): void {
        this.searchTerms.next(term);
    }

    filter(term: string): void {
        this.curSearch=term;
        this.filterTerms.next(term);
    }


    ngOnInit(): void {
        this.m = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => term
                ? this.filtersearchService.search(term)
                : Observable.of<Meeting[]>([]))
            .catch(error => {
                console.log(error);
                return Observable.of<Meeting[]>([]);
            });
        this.f = this.filterTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(f => f
                ? this.filtersearchService.filter(f)
                : Observable.of<Meeting[]>([]))
            .catch(error => {
                console.log(error);
                return Observable.of<Meeting[]>([]);
            });
    }

    gotoDetail(m: Meeting): void {
        let link = ['/details', m.id];
        this.router.navigate(link);
    }

    gotoDetails(f: Meeting): void {
        let link = ['/details', f.id];
        this.router.navigate(link);
    }
}
