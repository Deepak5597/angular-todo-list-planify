import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Task } from '../Task';
import { TaskDataService } from '../task/task.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DropEvent } from 'ng-drag-drop';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-todo-panel',
  templateUrl: './todo-panel.component.html',
  styleUrls: ['./todo-panel.component.scss']
})
export class TodoPanelComponent implements OnInit {

  constructor(private _taskService: TaskDataService,private _fb: FormBuilder,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.pendingTaskList$ = this._taskService.pendingTaskObj;
    this.inProgressTaskList$ = this._taskService.inProgressTaskObj;
    this.completedTaskList$ = this._taskService.completedTaskObj;
    this._taskService.performaceCountObj.subscribe((data:number)=>{this.performaceCount = data;});

    this.loadTaskForm();
    this._taskService.loadDummyData();
  }

  pendingTaskList$ : Observable<Task[]>;
  inProgressTaskList$ : Observable<Task[]>;
  completedTaskList$ : Observable<Task[]>;
  performaceCount : number;

  isUpdate:boolean=false;
  taskForm:FormGroup;
  loadTaskForm(){
    this.taskForm = this._fb.group({
      taskId: this._fb.control(''),
      taskLabel : this._fb.control(''),
      taskPriority : this._fb.control(''),
      taskDescription: this._fb.control(''),
      taskDueDate: this._fb.control('')
    });
  }

  /** Popup Modal */
  modalRef: BsModalRef;
  @ViewChild('addTaskModal') addEditPopup:TemplateRef<any>;
  @ViewChild('deleteTaskModal') deleteTaskPopup:TemplateRef<any>;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  initiateTaskAddition(){
      this.isUpdate = false;
      this.taskForm.reset();
      this.taskForm.patchValue({
        taskPriority : 'high'
      });
  }

  taskToUpdate:any;
  initiateTaskUpdate(taskToUpdate:any){
    this.isUpdate = true;
    this.taskToUpdate = taskToUpdate;
    this.taskForm.patchValue({
      taskId: taskToUpdate.task.taskId,
      taskLabel : taskToUpdate.task.taskLabel,
      taskPriority : taskToUpdate.task.taskPriority,
      taskDescription: taskToUpdate.task.taskDescription,
      taskDueDate: taskToUpdate.task.taskDueDate
    });
    this.openModal(this.addEditPopup);
  }

  taskToDelete:any;
  initiateTaskDeletion(taskToDelete:any){
    console.log(taskToDelete)
    this.taskToDelete = taskToDelete;
    this.openModal(this.deleteTaskPopup);
  }

  taskDropped(taskDroppedAt:string,dropEvent:DropEvent){
    this._taskService.moveTask(this.taskDraggedFrom,taskDroppedAt,dropEvent.dragData);
  }

  addUpdateTask(){
    if(this.isUpdate){
      this.taskToUpdate.task = this.taskForm.value;
      this._taskService.updateTask(this.taskToUpdate);
    }else{
      let taskToAdd = this.taskForm.value;
      taskToAdd.taskId = uuid();
      this._taskService.addTask(taskToAdd);
    }
  }

  deleteTask(){
      this._taskService.deleteTaskFromPanel(this.taskToDelete.taskType,this.taskToDelete.task.taskId);
  }

  taskDraggedFrom:string;
  initializeDragPanel(dragPanel:string){
    this.taskDraggedFrom = dragPanel;
  }

}
