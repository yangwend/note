// 发布订阅者模式之事件监听器

class EventBus {
  constructor() {
    // 初始化事件列表
    this.eventObject = {};
  }
  // 发布事件
  publish(eventName) {
    // 取出当前事件所有的回调函数
    const callbackList = this.eventObject[eventName];

    if (!callbackList) return console.warn(eventName + ' not found!');

    // 执行每一个回调函数
    for (let callback of callbackList) {
      callback();
    }
  }
  // 订阅事件
  subscribe(eventName, callback) {
    // 初始化这个事件
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = [];
    }

    // 存储订阅者的回调函数
    this.eventObject[eventName].push(callback);
  }
}

window.eventBus = new EventBus();
