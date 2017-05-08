import { Component, Injectable,Pipe, OnInit } from '@angular/core';

import {Meeting} from'../classes/meeting';
import {MeetingService} from '../services/meeting.service';

import {OrderBy} from './sort';


@Pipe({
    name: 'filterMeetings'
})
export class FilterMeetingsPipe {
    public transform(meetings: Meeting[], filter: string) {
        if (!meetings || !meetings.length) return [];
        if (!filter) return meetings;
        return meetings.filter(f => f.place.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
    }
}

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    providers:[OrderBy]

})
export class DashboardComponent implements OnInit {

    meetings: Meeting[] = [];

    constructor(private meetingService: MeetingService) { }

    ngOnInit(): void {
        this.meetingService.getMeetings()
            .then(meetings => this.meetings = meetings.slice(0, 3));
    }
}
