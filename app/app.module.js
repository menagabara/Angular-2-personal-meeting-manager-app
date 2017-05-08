"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var index_1 = require("./backend/index");
var testing_1 = require("@angular/http/testing");
var http_2 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var index_2 = require("./alert/index");
var aboutus_component_1 = require("./about/aboutus.component.");
var index_3 = require("./GuardsInRouting/index");
var index_4 = require("./services/index");
var index_5 = require("./meeting/index");
var index_6 = require("./login/index");
var index_7 = require("./register/index");
var meetingdetails_component_1 = require("./meeting/meetingdetails.component");
var meetings_component_1 = require("./meeting/meetings.component");
var dashboard_component_1 = require("./more/dashboard.component");
var filtersearch_component_1 = require("./more/filtersearch.component");
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var in_memory_data_service_1 = require("./classes/in-memory-data.service");
var sort_1 = require("./more/sort");
var about_component_1 = require("./about/about.component");
//import { Ng2OrderModule } from 'ng2-order-pipe';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_1.routing,
            angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.InMemoryDataService),
        ],
        declarations: [
            app_component_1.AppComponent,
            index_2.AlertComponent,
            index_5.HomeComponent,
            index_6.LoginComponent,
            index_7.RegisterComponent,
            meetingdetails_component_1.MeetingdetailsComponent,
            meetings_component_1.MeetingsComponent,
            dashboard_component_1.DashboardComponent,
            filtersearch_component_1.FilterearchComponent,
            dashboard_component_1.FilterMeetingsPipe,
            sort_1.OrderBy,
            about_component_1.AboutComponent,
            aboutus_component_1.AboutusComponent
        ],
        providers: [
            index_3.AuthGuard,
            index_4.AlertService,
            index_4.AuthenticationService,
            index_4.UserService,
            index_4.MeetingService,
            index_1.b_Provider,
            testing_1.MockBackend,
            http_2.BaseRequestOptions
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map