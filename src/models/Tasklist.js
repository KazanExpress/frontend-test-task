export class Tasklist {
  constructor() {
    this.uID = Date.now();
    this.tasks = [];
    this.title = '';
  }

  newTask(TaskName) {
    const date = Date.now();
    this.tasks.push({
      id: date,
      title: TaskName,
      completed: false,
      parent: this.uID,
    });
  }

  rewriteTask(taskProp) {
    const needItemInTasksArray = this.tasks.findIndex(
        (task) => task.id == taskProp.id);
    this.tasks[needItemInTasksArray] = taskProp;
  }

  addTask(Task) {
    Task.parent = this.uID;
    this.tasks.push(Task);
  }

  deleteTask(index) {
    const i = this.tasks.findIndex((task) => task.id == index.id);
    this.tasks.splice(i, 1);
  }

  sortTask(first, second) {
    const firstEl = this.tasks.findIndex((task) => task.id == first);
    const secElem = this.tasks.findIndex((task) => task.id == second);
    const tempElement = this.tasks[firstEl];
    this.tasks[firstEl] = this.tasks[secElem];
    this.tasks[secElem] = tempElement;
  }

  newTaskListFromFile(taskListObject) {
    Object.keys(taskListObject).forEach((key) =>{
      this[key] = taskListObject[key];
    });
  }

  taskListFromSS(taskListData) {
    Object.keys(taskListData).forEach((key) => {
      this[key] = taskListData[key];
    });
  }
  newTaskListFromTab(taskListData) {
    Object.keys(taskListData).forEach((key) => {
      this[key] = taskListData[key];
    });
  }

  newTaskListWithOneTask(taskListName) {
    taskListName = taskListName.length < 2 ? 'Список задач' : taskListName;
    this.uID = Date.now();
    this.title = taskListName;
    this.tasks = [
      {
        id: Date.now(),
        title: 'testTask',
        completed: false,
        parent: this.uID,
      }];
  }
}
