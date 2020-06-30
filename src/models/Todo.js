import {Broadcast} from './Broadcast';

export class Todo extends Broadcast {
  constructor() {
    super();
    this.beforeInit();
    this.init();

  }

  getAppName() {

    return this.appName;
  }

  setAppName(name) {
    this.appName = name;
    sessionStorage.setItem('appName', name);
    this.seTitleWindow();
    return this.getAppName();
  }

  // getAppID() {
  //   return this.appID;
  // }
  //
  // setSessionTS(date) {
  //   sessionStorage.setItem('sessionTS', date);
  //   this.sessionTS = date;
  //   return date;
  // }

  setAppID() {
    const appID = Math.floor(Math.random() * 1e8);
    this.appID = appID;
    sessionStorage.setItem('appID', appID);
    return appID;
  }

  beforeInit() {

  }

  init() {
    this.setStartValues();
  }

  isDuplicateTab() {
    let isDup;
    if (!window.name && sessionStorage.getItem('appName')) {
      this.dup = true;
      isDup = true;
    } else {
      this.dup = false;
      isDup = false;
    }
    sessionStorage.setItem('dupTab', 'true');
    window.name = true;
    return isDup;
  }

  seTitleWindow() {
    document.title = `${this.appName} - ${this.appID}`
  }

  setStartValues() {
    if (this.isDuplicateTab()) {
      this.appName = this.setAppName('ToDo');
      this.appID = this.setAppID();
      sessionStorage.removeItem('TaskList');


    } else {
      this.appName = sessionStorage.getItem('appName') ||
        this.setAppName('ToDo');

      this.appID = sessionStorage.getItem('appID') || this.setAppID();

    }
    this.seTitleWindow();
  }
}
