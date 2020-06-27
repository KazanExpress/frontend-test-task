export class  Broadcast {
  constructor() {
    this.bc = new BroadcastChannel('TodoChannel');

  }

  msg(message){
    bc.postMessage(message)
  }

  evt(func){
    bc.addEventListener('message', function (e){
      console.log(e);
    })
  }






}
