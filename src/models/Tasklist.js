export class Tasklist {
  constructor() {
    this.uID = Date.now()
    this.tasks = []
    this.title = ''
  }

  newTask(TaskName) {
    let date = Date.now();
    this.tasks.push({
      id: date,
      title: TaskName,
      completed: false,
      parent: this.uID,
    });
  }

  rewriteTask(taskProp) {
    let needItemInTasksArray = this.tasks.findIndex(
      task => task.id == taskProp.id);
    this.tasks[needItemInTasksArray] = taskProp;
  }

  addTask(Task) {
    Task.parent = this.uID;
    this.tasks.push(Task);
  }

  deleteTask(index) {
    const i = this.tasks.findIndex(task => task.id == index.id);
    this.tasks.splice(i, 1);
  }

  sortTask(first, second) {
    const firstEl = this.tasks.findIndex(task => task.id == first);
    let secElem = this.tasks.findIndex(task => task.id == second);
    let tempElement = this.tasks[firstEl];
    this.tasks[firstEl] = this.tasks[secElem];
    this.tasks[secElem] = tempElement;
  }

  newTaskListFromFile(tasksArray, taskListName) {
    console.log('1.5');
    this.uID = Date.now();
    this.title = taskListName;
    tasksArray.forEach(item => item.parent = this.uID);
    this.tasks = tasksArray;
  }

  taskListFromSS(taskListData) {
    Object.keys(taskListData).forEach((key) => {
      this[key] = taskListData[key];
    });

  }
  newTaskListFromTab(taskListData){
    Object.keys(taskListData).forEach((key) => {
      this[key] = taskListData[key];
    });
  }

  newTaskListWithOneTask(taskListName = 'Список задач') {
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
