import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {


  @Input('data') public dataObj:Task;
  @Input('taskType') public taskType:string;

  @Output() updateTaskData:EventEmitter<any> = new EventEmitter();
  @Output() dragPanel:EventEmitter<string> = new EventEmitter();
  @Output() deleteTaskData:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  /** Fire Event to parent, if update button is clicked */
  updateTask(){
    this.updateTaskData.emit({
        task: this.dataObj,
        taskType: this.taskType
    });
  }

  /** Fire Event to parent, if Delete button is clicked */
  deleteTask(){
    this.deleteTaskData.emit({
      task: this.dataObj,
      taskType: this.taskType
  });
  }
}
