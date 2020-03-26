export interface IState {
  projectName: string;
  filters: IFilters;
  items: IItem[];
}

interface IFilters {
  filterValue: string;
  filteredItems: IItem[];
}

export interface IItem {
  checked: boolean;
  name: string;
  subitems: IItem[];
}
