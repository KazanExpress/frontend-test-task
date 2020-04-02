export interface IApplication {
  name: string;
  taskItems: ITaskItems[];
}
export interface ITaskItems {
  name: string;
  description: string;
  isChecked: boolean;
  enclosedTaskItem: ITaskItems[];
}
