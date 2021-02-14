export class Task{

    taskId:string;
    taskLabel: string;
    taskPriority: string;
    taskDescription: string;
    taskDueDate: string;
    constructor(taskId:string,taskLabel:string,taskPriority:string,taskDescription:string,taskDueDate:string){
        this.taskId = taskId,
        this.taskLabel = taskLabel;
        this.taskPriority = taskPriority,
        this.taskDescription = taskDescription,
        this.taskDueDate = taskDueDate;
    }
}
