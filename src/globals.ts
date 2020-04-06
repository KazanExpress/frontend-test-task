// function required to save application state
export const saveStateTasks: Map<
  string,
  { storeFn: Function; getValue: Function }
> = new Map()

export const saveState = () => {
  saveStateTasks.forEach((it) => {
    it.storeFn(it.getValue())
  })
}
