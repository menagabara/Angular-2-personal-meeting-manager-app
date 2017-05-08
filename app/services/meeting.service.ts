import { Injectable } from '@angular/core';

import { Meeting } from '../classes/meeting';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable() //metadata about the service
export class MeetingService {

    private meetingUrl = 'api/meeting';  // URL to web api

    constructor(private http: Http) { }


    getMeetings(): Promise<Meeting[]> {
        return this.http.get(this.meetingUrl)
            .toPromise()
            .then(response => response.json().data as Meeting[]) //return promise
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getMeeting(id: number): Promise<Meeting> {
        const url = `${this.meetingUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Meeting)
            .catch(this.handleError);
    }

    private headers = new Headers({'Content-Type': 'application/json'}); //34an l data l btro7 d.

    updateMeeting(meeting: Meeting): Promise<Meeting> {
        const url = `${this.meetingUrl}/${meeting.id}`;
        return this.http
            .put(url, JSON.stringify(meeting), {headers: this.headers}) //justify which meeting
            .toPromise()
            .then(() => meeting)
            .catch(this.handleError);
    }

    create(title: string): Promise<Meeting> {
        return this.http
            .post(this.meetingUrl, JSON.stringify({title: title}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Meeting)
            .catch(this.handleError);
    }

    delete(meeting: number): Promise<void> {
        const url = `${this.meetingUrl}/${meeting}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
}