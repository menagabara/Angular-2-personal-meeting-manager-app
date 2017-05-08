import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './meeting/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './GuardsInRouting/index';

import {MeetingsComponent} from './meeting/meetings.component';
import {DashboardComponent} from './more/dashboard.component';
import {MeetingdetailsComponent} from './meeting/meetingdetails.component';
import {AboutComponent} from './about/about.component';
import {AboutusComponent} from './about/aboutus.component.';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'meeting', component: MeetingsComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'details/:id', component: MeetingdetailsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'aboutus', component: AboutusComponent },

    // otherwise redirect to meeting
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);