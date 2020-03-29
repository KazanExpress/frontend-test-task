import { IProject } from '@/store/models'

// key name for save project in session storage
export const keyNameForSave = 'project'

export const getItemFromSessionStorage = (key: string): { key: string; data: IProject } | null => {
  const item = window.sessionStorage.getItem(key)
  if (item !== null) {
    return { key, data: JSON.parse(item) }
  }
  return null
}
export const destroyItemFromSessionStorage = (key: string): void => {
  window.sessionStorage.removeItem(key)
}
export const setItemToSessionStorage = (key: string, data: IProject[]): void => {
  window.sessionStorage.setItem(key, JSON.stringify(data))
}
// handler for event onbeforeunload,how save data in session storage before page is a reload
export const beforeUnload = function (store: any, keyForSave: string, fn: Function): void | boolean {
  const data = store.state.project
  fn.call(null, keyForSave, data)
  // return true
}
export default {
  keyNameForSave,
  getItemFromSessionStorage,
  destroyItemFromSessionStorage,
  setItemToSessionStorage,
  beforeUnload
}
