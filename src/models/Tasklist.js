export class Tasklist {
  constructor(i = 0, taskArray = {}, taskListName = 'Список задач ' + i) {
    let ss_tasksObject = JSON.parse(sessionStorage.getItem('TaskList'));
    if (ss_tasksObject && ss_tasksObject[i]) {
      ss_tasksObject = ss_tasksObject[i];
      Object.keys(ss_tasksObject).forEach((key) => {
        this[key] = ss_tasksObject[key];
      });
    } else if (taskArray.tasks && taskArray.tasks.length > 0) {
      Object.keys(taskArray).forEach((key) => {
        this[key] = taskArray[key];
      });
    } else {
      this.count = i + 1;
      this.id = this.count;
      this.uID = Date.now()
      this.title = taskListName
      this.tasks = [
        {
          id: Date.now(),
          title: 'testTask',
          completed: false,
          parent: this.uID,
        }];
      this.count++;
    }

  }

  newTask(TaskName) {
    console.log(TaskName);
    let k = TaskName
    let date = Date.now()
    console.log(date);
    this.tasks.push({
      id: date,
      title: k,
      completed: false,
      parent: this.uID,
    });
  }

  rewriteTask(taskProp){
    console.log(taskProp);
    let needItemInTasksArray = this.tasks.findIndex(task => task.id == taskProp.id);
    this.tasks[needItemInTasksArray] = taskProp;
    console.log(this.tasks[needItemInTasksArray]);
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

}
