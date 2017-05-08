import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import {Meeting} from'../classes/meeting';
import {MeetingService} from '../services/meeting.service';

@Component({
    moduleId: module.id,
    templateUrl: 'meetingdetails.component.html',
    selector: 'meeting-detail'
})
export class MeetingdetailsComponent implements OnInit {
    selectedmeeting: Meeting;
    meetings : Meeting[]; //const meeting

    state:string[]=[
        'Active',
        'Passed',
        'Postponed'
    ];
    priority:string[]=[
        'Max',
        'Medium',
        'Min'
    ];

    constructor(
        private meetingService: MeetingService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.meetingService.getMeeting(+params['id']))
            .subscribe(selectedmeeting => this.selectedmeeting = selectedmeeting);
    }

    goBack(): void {
        this.location.back();
    }

    //save data.
    save(): void {
        this.meetingService.updateMeeting(this.selectedmeeting)
            .then(() => this.goBack());
    }
    delete(meeting: Meeting): void {
        this.meetingService.delete(meeting.id)
            .then(() => {
                this.meetings = this.meetings.filter(h => h !== meeting);
                if (this.selectedmeeting === meeting) { this.selectedmeeting = null; }
            });
    }

}