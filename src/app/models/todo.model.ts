export class Todo {
    id: number;
    task: string;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean = false;
    constructor(id: number, task: string, description: string, dueDate: Date) {
      this.id = id;
      this.task = task;
      this.title = task;
      this.description = description;
      this.dueDate = dueDate;
      this.completed = false
    }
  }
  