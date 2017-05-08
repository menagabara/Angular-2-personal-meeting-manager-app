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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var MeetingService = (function () {
    function MeetingService(http) {
        this.http = http;
        this.meetingUrl = 'api/meeting'; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' }); //34an l data l btro7 d.
    }
    MeetingService.prototype.getMeetings = function () {
        return this.http.get(this.meetingUrl)
            .toPromise()
            .then(function (response) { return response.json().data; }) //return promise
            .catch(this.handleError);
    };
    MeetingService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    MeetingService.prototype.getMeeting = function (id) {
        var url = this.meetingUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    MeetingService.prototype.updateMeeting = function (meeting) {
        var url = this.meetingUrl + "/" + meeting.id;
        return this.http
            .put(url, JSON.stringify(meeting), { headers: this.headers }) //justify which meeting
            .toPromise()
            .then(function () { return meeting; })
            .catch(this.handleError);
    };
    MeetingService.prototype.create = function (title) {
        return this.http
            .post(this.meetingUrl, JSON.stringify({ title: title }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    MeetingService.prototype.delete = function (meeting) {
        var url = this.meetingUrl + "/" + meeting;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    return MeetingService;
}());
MeetingService = __decorate([
    core_1.Injectable() //metadata about the service
    ,
    __metadata("design:paramtypes", [http_1.Http])
], MeetingService);
exports.MeetingService = MeetingService;
//# sourceMappingURL=meeting.service.js.map