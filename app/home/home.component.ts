import { Component, OnInit } from '@angular/core';

import { User } from '../classes/index';
import { UserService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    tasks: string[];
    showTasks: boolean;


    constructor(private userService: UserService ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.tasks = ['MIS Project', 'Practical', 'Final','GP'];
        this.showTasks = false;
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    update(user: User) {
        return this.userService.update(user).subscribe(()=>{this.loadAllUsers()});
    }


    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    toggleTasks(){
        this.showTasks = !this.showTasks;
    }

    addTask(task: any){
        this.tasks.push(task);
    }

    deleteTask(i: any){
        this.tasks.splice(i, 1);
    }
}