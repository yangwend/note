/**
 * 等待事件队列处理方法
 */

let queueArr: Function[] = [];

const clear = () => {
  queueArr = [];
};

const loop = async (eventArr: Function[]) => {
  for (const event of eventArr) {
    await event();
  }
};

const watch = async () => {
  if (queueArr.length > 0) {
    await loop(queueArr);
    clear();
  }
};

const waitingRun = async ({ startEvent, waitEvents }: { startEvent: Function | null; waitEvents: Function[] }) => {
  if (startEvent instanceof Function) {
    await startEvent();
    queueArr = waitEvents;
  } else {
    await loop(waitEvents);
  }
};

export { watch, waitingRun };
