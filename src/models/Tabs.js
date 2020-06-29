import {Todo} from './Todo';

export class Tabs extends Todo {
  constructor() {
    super();
    this.tabs = [];
  }

  init() {
    super.init();
    setInterval(() => this.requestData(
      JSON.stringify(
        {'appID': this.appID, 'appName': this.appName, TS: Date.now()})), 2000);
    this.registerTabs();
    this.clearOldTabs();
  }

  registerTabs() {
    this.evt((e) => {
      let request = JSON.parse(e.data);
      let index = this.tabs.findIndex(tab => {
        return tab.appID == request.appID;
      });
      if (index == -1) {
        this.tabs.push(request);
      } else {
        this.tabs[index] = request;
      }
    });
  }

  clearOldTabs() {
    setInterval(() => {
      if (this.tabs && this.tabs.length > 0) {
        let now = Date.now() - 5000;
        this.tabs = this.tabs.filter(tab => {
          return tab.TS > now
        });
      }
    }, 3000);

  }

}
