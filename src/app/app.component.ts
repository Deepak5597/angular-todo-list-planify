import { Component} from '@angular/core';
import { Task } from './Task';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor(){
    if(localStorage.getItem('pendingTaskList') == null){
      localStorage.setItem('pendingTaskList',JSON.stringify([new Task(uuid(),'Call Dad','high','Call Dad before his time for the medicine','2021-02-19T11:49'),new Task(uuid(),'Go Shopping','low','Go Shopping to tak groceries for the entire month','2021-12-19T11:49')]));
    }
    if(localStorage.getItem('inProgressTaskList') == null){
      localStorage.setItem('inProgressTaskList',JSON.stringify([new Task(uuid(),'Homework','high','Need to help children to complete their home work before going to bed','2021-07-19T19:49')]));
    }
    if(localStorage.getItem('completedTaskList') == null){
      localStorage.setItem('completedTaskList',JSON.stringify([new Task(uuid(),'Clean Room','low','Need to clean the entire room as friends are going to visit the house','2021-03-19T11:49')]));
    }
  }

}
