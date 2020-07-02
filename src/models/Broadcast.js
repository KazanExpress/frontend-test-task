export class Broadcast {
  constructor() {
    this.bc = new BroadcastChannel('TodoChannel');
  }

  msg(message) {
    this.bc.postMessage(message);
  }

  evt(func) {
    this.bc.addEventListener('message', func);
  }

  requestData(data) {
    this.msg(data);
  }
}
