export class Tasklist {
  constructor(i = 0) {

    let ss_tasksObject = JSON.parse(sessionStorage.getItem('TaskList'))
    if (ss_tasksObject && ss_tasksObject[i]) {
      ss_tasksObject = ss_tasksObject[i]
      Object.keys(ss_tasksObject).forEach((key) =>{
        this[key] = ss_tasksObject[key]
      })
    } else {
      this.count = i+1;
      this.taskNumber = 1
      this.id = this.count++
      this.title = 'SomeTitle' + i
      this.tasks = [
        {
          id: this.taskNumber++,
          title: 'testTask',
          completed: false
        }]
    }


  }

  newTask(TaskName) {
    this.tasks.push({id: this.taskNumber++, title: TaskName, completed: false});
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
  }

}
