export interface TaskI {
  title: string
  id: number
  completed: boolean
  description?: string
  [others: string]: any
}

export type ProjectT = {
  name?: string
  tasks?: TaskI[]
}
