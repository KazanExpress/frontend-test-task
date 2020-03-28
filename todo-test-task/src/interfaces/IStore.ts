export interface IState {
  projectName: string;
  filters: IFilters;
  items: IItem[];
  projects: Set<String>;
}

interface IFilters {
  filterValue: string;
  filteredItems: IItem[];
}

export interface IItem {
  id: string;
  checked: boolean;
  name: string;
  subitems: IItem[];
}
