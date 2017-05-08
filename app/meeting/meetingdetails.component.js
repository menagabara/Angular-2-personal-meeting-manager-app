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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var meeting_service_1 = require("../services/meeting.service");
var MeetingdetailsComponent = (function () {
    function MeetingdetailsComponent(meetingService, route, location) {
        this.meetingService = meetingService;
        this.route = route;
        this.location = location;
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
    }
    MeetingdetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.meetingService.getMeeting(+params['id']); })
            .subscribe(function (selectedmeeting) { return _this.selectedmeeting = selectedmeeting; });
    };
    MeetingdetailsComponent.prototype.goBack = function () {
        this.location.back();
    };
    //save data.
    MeetingdetailsComponent.prototype.save = function () {
        var _this = this;
        this.meetingService.updateMeeting(this.selectedmeeting)
            .then(function () { return _this.goBack(); });
    };
    MeetingdetailsComponent.prototype.delete = function (meeting) {
        var _this = this;
        this.meetingService.delete(meeting.id)
            .then(function () {
            _this.meetings = _this.meetings.filter(function (h) { return h !== meeting; });
            if (_this.selectedmeeting === meeting) {
                _this.selectedmeeting = null;
            }
        });
    };
    return MeetingdetailsComponent;
}());
MeetingdetailsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'meetingdetails.component.html',
        selector: 'meeting-detail'
    }),
    __metadata("design:paramtypes", [meeting_service_1.MeetingService,
        router_1.ActivatedRoute,
        common_1.Location])
], MeetingdetailsComponent);
exports.MeetingdetailsComponent = MeetingdetailsComponent;
//# sourceMappingURL=meetingdetails.component.js.map