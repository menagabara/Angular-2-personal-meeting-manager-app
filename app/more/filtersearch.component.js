"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var filtersearch_service_1 = require("../services/filtersearch.service");
var FilterearchComponent = (function () {
    function FilterearchComponent(filtersearchService, router) {
        this.filtersearchService = filtersearchService;
        this.router = router;
        this.searchTerms = new Subject_1.Subject();
        this.filterTerms = new Subject_1.Subject();
    }
    FilterearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    FilterearchComponent.prototype.filter = function (term) {
        this.curSearch = term;
        this.filterTerms.next(term);
    };
    FilterearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.m = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return term
            ? _this.filtersearchService.search(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]);
        });
        this.f = this.filterTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (f) { return f
            ? _this.filtersearchService.filter(f)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    FilterearchComponent.prototype.gotoDetail = function (m) {
        var link = ['/details', m.id];
        this.router.navigate(link);
    };
    FilterearchComponent.prototype.gotoDetails = function (f) {
        var link = ['/details', f.id];
        this.router.navigate(link);
    };
    return FilterearchComponent;
}());
FilterearchComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'filter-search',
        templateUrl: 'filtersearch.component.html',
        providers: [filtersearch_service_1.FiltersearchService]
    }),
    __metadata("design:paramtypes", [filtersearch_service_1.FiltersearchService,
        router_1.Router])
], FilterearchComponent);
exports.FilterearchComponent = FilterearchComponent;
//# sourceMappingURL=filtersearch.component.js.map