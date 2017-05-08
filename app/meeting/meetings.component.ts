import { Component,ChangeDetectionStrategy,Pipe, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Meeting} from'../classes/meeting';
import {MeetingService} from '../services/meeting.service';
import {OrderBy} from '../more/sort';

@Component({
    moduleId: module.id,
    selector: 'meetings-app',
    templateUrl: 'meetings.component.html',
    providers:[MeetingService,OrderBy]
})

export class MeetingsComponent implements OnInit {

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
    meetings : Meeting[]; //const meeting
    selectedmeeting: Meeting; //class
    sortedmeetings : Meeting[]; //const meeting
    showSortedMeetings: boolean;

    onSelect(m: Meeting): void { //view details of the selected meeting
        this.selectedmeeting = m;
    }
    constructor(private meetingService: MeetingService,private router:Router) {
        this.showSortedMeetings=false;
    }

    getMeetings(){ //service
        this.meetingService.getMeetings().then(meetings => this.meetings = meetings)
    }
    getsortedMeetings(){ //service
        this.meetingService.getMeetings().then(sortedmeetings => this.sortedmeetings = sortedmeetings)
    }
    toggleSortedMeetings(){
        this.showSortedMeetings = !this.showSortedMeetings;
    }


    ngOnInit() {
        this.getMeetings();
        this.getsortedMeetings();
    }

    gotoDetail(): void {
        this.router.navigate(['/details', this.selectedmeeting.id]);
    }

    //add meeting title
    add(title: string): void {
        title = title.trim();
        if (!title) { return; }
        this.meetingService.create(title)
            .then(selectedmeeting => {
                this.meetings.push(selectedmeeting);
                this.selectedmeeting = null;
            });
    }

    //delete meeting
    delete(meeting: Meeting): void {
        this.meetingService.delete(meeting.id)
            .then(() => {
                this.meetings = this.meetings.filter(h => h !== meeting);
                if (this.selectedmeeting === meeting) { this.selectedmeeting = null; }
            });
    }

}