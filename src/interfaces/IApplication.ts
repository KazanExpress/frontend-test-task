export interface IApplication {
  name: string;
  taskItems: ITask[];
}
export interface ITask {
  name: string;
  description: string;
  isChecked: boolean;
  enclosedTaskItem: ITask[];
}
