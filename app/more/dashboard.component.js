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
var meeting_service_1 = require("../services/meeting.service");
var sort_1 = require("./sort");
var FilterMeetingsPipe = (function () {
    function FilterMeetingsPipe() {
    }
    FilterMeetingsPipe.prototype.transform = function (meetings, filter) {
        if (!meetings || !meetings.length)
            return [];
        if (!filter)
            return meetings;
        return meetings.filter(function (f) { return f.place.toLowerCase().indexOf(filter.toLowerCase()) >= 0; });
    };
    return FilterMeetingsPipe;
}());
FilterMeetingsPipe = __decorate([
    core_1.Pipe({
        name: 'filterMeetings'
    })
], FilterMeetingsPipe);
exports.FilterMeetingsPipe = FilterMeetingsPipe;
var DashboardComponent = (function () {
    function DashboardComponent(meetingService) {
        this.meetingService = meetingService;
        this.meetings = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.meetingService.getMeetings()
            .then(function (meetings) { return _this.meetings = meetings.slice(0, 3); });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-dashboard',
        templateUrl: 'dashboard.component.html',
        providers: [sort_1.OrderBy]
    }),
    __metadata("design:paramtypes", [meeting_service_1.MeetingService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map