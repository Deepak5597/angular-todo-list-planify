import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Task } from '../Task';

export class TaskDataService{

  private pendingTask = new BehaviorSubject<Task[]>([]);
  pendingTaskObj= this.pendingTask.asObservable();

  private inProgressTask = new BehaviorSubject<Task[]>([]);
  inProgressTaskObj= this.inProgressTask.asObservable();

  private completedTask = new BehaviorSubject<Task[]>([]);
  completedTaskObj= this.completedTask.asObservable();

  private performanceCount = new BehaviorSubject<number>(0);
  performaceCountObj= this.performanceCount.asObservable();

  /**Refresh Data here - It will automatically be refresh in view [ based upon priority ] */
  refreshTaskData(taskType:string){
     let dataFromStorage:Task[] =[];
     if(taskType == 'pending'){
        dataFromStorage = JSON.parse(localStorage.getItem('pendingTaskList'));
        this.pendingTask.next(this.sortJSONArray(dataFromStorage,'taskDueDate'));
     }else if(taskType == 'inprogress'){
        dataFromStorage = JSON.parse(localStorage.getItem('inProgressTaskList'));
        this.inProgressTask.next(this.sortJSONArray(dataFromStorage,'taskDueDate'));
     }else{
        dataFromStorage = JSON.parse(localStorage.getItem('completedTaskList'));
        this.completedTask.next(this.sortJSONArray(dataFromStorage,'taskDueDate'));
     }
     this.performanceCount.next(this.getPerformaceCount());
  }

  /**Update a task */
  updateTask(taskToUpdate:any){
    let dataToProcess:Task[];
    if(taskToUpdate.taskType == 'pending'){
      dataToProcess = JSON.parse(localStorage.getItem('pendingTaskList'));
      for(let i=0;i<dataToProcess.length;i++){
        if(dataToProcess[i].taskId == taskToUpdate.task.taskId){
          dataToProcess[i] = taskToUpdate.task;
          break;
        }
      }
      localStorage.setItem('pendingTaskList',JSON.stringify(dataToProcess));
    }else if(taskToUpdate.taskType == 'inprogress'){
      dataToProcess = JSON.parse(localStorage.getItem('inProgressTaskList'));
      for(let i=0;i<dataToProcess.length;i++){
        if(dataToProcess[i].taskId == taskToUpdate.task.taskId){
          dataToProcess[i] = taskToUpdate.task;
          break;
        }
      }
      localStorage.setItem('inProgressTaskList',JSON.stringify(dataToProcess));
    }else{
      dataToProcess = JSON.parse(localStorage.getItem('completedTaskList'));
      for(let i=0;i<dataToProcess.length;i++){
        if(dataToProcess[i].taskId == taskToUpdate.task.taskId){
          dataToProcess[i] = taskToUpdate.task;
          break;
        }
      }
      localStorage.setItem('completedTaskList',JSON.stringify(dataToProcess));
    }
    this.refreshTaskData(taskToUpdate.taskType);
  }

  /** Add a task [default added to pending panel]*/
  addTask(taskToAdd:any){
    this.addNewTaskToPanel('pending',taskToAdd);
  }

  /** move a task from one panel to other */
  moveTask(from:string,to:string,task:Task){
      this.removeTaskFromPanel(from,task.taskId);
      this.addNewTaskToPanel(to,task);
  }

  /**load dummy Data */
  loadDummyData(){
    this.refreshTaskData('pending');
    this.refreshTaskData('inprogress');
    this.refreshTaskData('completed');
  }

  /** Remove a task from panel */
  removeTaskFromPanel(panelType:string,taskId:string){
    let dataToProcess:Task[];
    let dataAfterProcess:Task[]=[];
      if(panelType == 'pending'){
        dataToProcess = JSON.parse(localStorage.getItem('pendingTaskList'));
        for(let i=0;i<dataToProcess.length;i++){
          if(dataToProcess[i].taskId != taskId){
            dataAfterProcess.push(dataToProcess[i]);
          }
        }
        localStorage.setItem('pendingTaskList',JSON.stringify(dataAfterProcess));
      }else if(panelType == 'inprogress'){
        dataToProcess = JSON.parse(localStorage.getItem('inProgressTaskList'));
        for(let i=0;i<dataToProcess.length;i++){
          if(dataToProcess[i].taskId != taskId){
            dataAfterProcess.push(dataToProcess[i]);
          }
        }
        localStorage.setItem('inProgressTaskList',JSON.stringify(dataAfterProcess));
      }else{
        dataToProcess = JSON.parse(localStorage.getItem('completedTaskList'));
        for(let i=0;i<dataToProcess.length;i++){
          if(dataToProcess[i].taskId != taskId){
            dataAfterProcess.push(dataToProcess[i]);
          }
        }
        localStorage.setItem('completedTaskList',JSON.stringify(dataAfterProcess));
      }
      this.refreshTaskData(panelType);
  }

  /**Add new Task to Panel */
  addNewTaskToPanel(panelType:string,task:Task){
    let dataToProcess:Task[];
    if(panelType == 'pending'){
      dataToProcess = JSON.parse(localStorage.getItem('pendingTaskList'));
      dataToProcess.push(task);
      localStorage.setItem('pendingTaskList',JSON.stringify(dataToProcess));
    }else if(panelType == 'inprogress'){
      dataToProcess = JSON.parse(localStorage.getItem('inProgressTaskList'));
      dataToProcess.push(task);
      localStorage.setItem('inProgressTaskList',JSON.stringify(dataToProcess));
    }else{
      dataToProcess = JSON.parse(localStorage.getItem('completedTaskList'));
      dataToProcess.push(task);
      localStorage.setItem('completedTaskList',JSON.stringify(dataToProcess));
    }
    this.refreshTaskData(panelType);
  }

  deleteTaskFromPanel(panelType:string,taskId:string){
    this.removeTaskFromPanel(panelType,taskId);
  }

  /**Sort Json Array Based upon particular key */
  sortJSONArray(data:Task[],property:string):Task[]{
    return data.sort((a,b)=> a[property] < b[property] ? -1 : 1)
  }

  /**Get Performace Count */
  getPerformaceCount():number{
    let pendingTasks = JSON.parse(localStorage.getItem('pendingTaskList')).length;
    let inProgressTasks = JSON.parse(localStorage.getItem('inProgressTaskList')).length;
    let completedTasks = JSON.parse(localStorage.getItem('completedTaskList')).length;
    return Math.round((completedTasks / (pendingTasks + inProgressTasks + completedTasks)) * 100);
  }
}
