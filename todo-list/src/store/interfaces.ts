export interface State {
  projectName: string;
  filters: Filters;
  items: Item[];
  projects: Set<String>;
}

interface Filters {
  filterValue: string;
  filteredItems: Item[];
  savedFilters: StringArray[];
}

interface StringArray {
  [index: number]: string;
}

export interface Item {
  id: string;
  checked: boolean;
  name: string;
  subitems: Item[];
}

export interface RenameItem {
  id: string;
  name: string;
}
