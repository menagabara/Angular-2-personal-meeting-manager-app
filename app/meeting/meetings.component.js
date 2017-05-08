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
var meeting_service_1 = require("../services/meeting.service");
var sort_1 = require("../more/sort");
var MeetingsComponent = (function () {
    function MeetingsComponent(meetingService, router) {
        this.meetingService = meetingService;
        this.router = router;
        this.state = [
            'Active',
            'Passed',
            'Postponed'
        ];
        this.priority = [
            'Max',
            'Medium',
            'Min'
        ];
        this.showSortedMeetings = false;
    }
    MeetingsComponent.prototype.onSelect = function (m) {
        this.selectedmeeting = m;
    };
    MeetingsComponent.prototype.getMeetings = function () {
        var _this = this;
        this.meetingService.getMeetings().then(function (meetings) { return _this.meetings = meetings; });
    };
    MeetingsComponent.prototype.getsortedMeetings = function () {
        var _this = this;
        this.meetingService.getMeetings().then(function (sortedmeetings) { return _this.sortedmeetings = sortedmeetings; });
    };
    MeetingsComponent.prototype.toggleSortedMeetings = function () {
        this.showSortedMeetings = !this.showSortedMeetings;
    };
    MeetingsComponent.prototype.ngOnInit = function () {
        this.getMeetings();
        this.getsortedMeetings();
    };
    MeetingsComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/details', this.selectedmeeting.id]);
    };
    //add meeting title
    MeetingsComponent.prototype.add = function (title) {
        var _this = this;
        title = title.trim();
        if (!title) {
            return;
        }
        this.meetingService.create(title)
            .then(function (selectedmeeting) {
            _this.meetings.push(selectedmeeting);
            _this.selectedmeeting = null;
        });
    };
    //delete meeting
    MeetingsComponent.prototype.delete = function (meeting) {
        var _this = this;
        this.meetingService.delete(meeting.id)
            .then(function () {
            _this.meetings = _this.meetings.filter(function (h) { return h !== meeting; });
            if (_this.selectedmeeting === meeting) {
                _this.selectedmeeting = null;
            }
        });
    };
    return MeetingsComponent;
}());
MeetingsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'meetings-app',
        templateUrl: 'meetings.component.html',
        providers: [meeting_service_1.MeetingService, sort_1.OrderBy]
    }),
    __metadata("design:paramtypes", [meeting_service_1.MeetingService, router_1.Router])
], MeetingsComponent);
exports.MeetingsComponent = MeetingsComponent;
//# sourceMappingURL=meetings.component.js.map