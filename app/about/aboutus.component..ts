import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'aboutus',
    templateUrl: 'aboutus.component.html'
})
export class AboutusComponent  {
    header_title: string;

    constructor(){
        this.header_title = "This is an about page!"
    }

}
