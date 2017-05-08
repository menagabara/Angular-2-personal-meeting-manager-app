import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { b_Provider } from './backend/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './alert/index';
import {AboutusComponent} from "./about/aboutus.component.";
import { AuthGuard } from './GuardsInRouting/index';
import { AlertService, AuthenticationService, UserService,MeetingService } from './services/index';
import { HomeComponent } from './meeting/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { MeetingdetailsComponent } from './meeting/meetingdetails.component';
import {MeetingsComponent} from './meeting/meetings.component';
import {DashboardComponent,FilterMeetingsPipe} from './more/dashboard.component';
import {FilterearchComponent} from './more/filtersearch.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './classes/in-memory-data.service';
import {OrderBy} from "./more/sort";

import {AboutComponent} from "./about/about.component";

//import { Ng2OrderModule } from 'ng2-order-pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        MeetingdetailsComponent,
        MeetingsComponent,
        DashboardComponent,
        FilterearchComponent,
        FilterMeetingsPipe,
        OrderBy,
        AboutComponent,
        AboutusComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        MeetingService,
        b_Provider,
        MockBackend,
        BaseRequestOptions

    ],
    bootstrap: [AppComponent]
})

export class AppModule { }