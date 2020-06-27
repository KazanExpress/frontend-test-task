export class Todo {
  constructor () {
    this.appName = sessionStorage.getItem('appName') || this.setAppName('Default')
    this.appID = sessionStorage.getItem('appID') || this.setAppID()
    this.test = 'asdasdasdas'
  }

  getAppName () {
    if (!this.appName && !sessionStorage.getItem('appName')) {
      this.setAppName('Default Project')
    }
    return this.appName
  }

  setAppName (name) {
    this.appName = name
    sessionStorage.setItem('appName', name)
    return this.getAppName()
  }

  getAppID () {
    console.log(sessionStorage.getItem('appID'))
    return this.appName
  }

  setAppID () {
    const appID = Math.floor(Math.random() * 1e8)
    this.appID = appID
    sessionStorage.setItem('appID', appID)
  }
}
