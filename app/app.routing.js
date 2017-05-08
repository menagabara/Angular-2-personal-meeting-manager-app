"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./meeting/index");
var index_2 = require("./login/index");
var index_3 = require("./register/index");
var index_4 = require("./GuardsInRouting/index");
var meetings_component_1 = require("./meeting/meetings.component");
var dashboard_component_1 = require("./more/dashboard.component");
var meetingdetails_component_1 = require("./meeting/meetingdetails.component");
var about_component_1 = require("./about/about.component");
var aboutus_component_1 = require("./about/aboutus.component.");
var appRoutes = [
    { path: '', component: index_1.HomeComponent, canActivate: [index_4.AuthGuard] },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'register', component: index_3.RegisterComponent },
    { path: 'meeting', component: meetings_component_1.MeetingsComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'details/:id', component: meetingdetails_component_1.MeetingdetailsComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'aboutus', component: aboutus_component_1.AboutusComponent },
    // otherwise redirect to meeting
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map