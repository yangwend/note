

// eslint-disable-next-line import/no-anonymous-default-export
export default class DocumentUtil {
  static updateTitle = (title: string) => {
    setTimeout(() => {
      // 利用iframe的onload事件刷新页面
      document.title = title;
      const iframe = document.createElement('iframe');
      iframe.style.visibility = 'hidden';
      iframe.style.width = '1px';
      iframe.style.height = '1px';
      iframe.onload = () => {
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 0);
      };
      document.body.appendChild(iframe);
    }, 0);
  };

  static autoScrollIfFocus = () => {
    setTimeout(() => {
      const activeElement = document.activeElement;
      if (activeElement) {
        if ('scrollIntoView' in activeElement) {
          activeElement.scrollIntoView();
          console.log('scrollIntoView');
          // @ts-ignore
        } else if (activeElement.scrollIntoViewIfNeeded) {
          // @ts-ignore
          activeElement.scrollIntoViewIfNeeded();
          console.log('scrollIntoViewIfNeeded');
        }
      }
    }, 600);
  };

  static scrollIntoView = (element: Element) => {
    setTimeout(() => {
      if (element) {
        if ('scrollIntoView' in element) {
          element.scrollIntoView();
          console.log('scrollIntoView');
          // @ts-ignore
        } else if (element.scrollIntoViewIfNeeded) {
          // @ts-ignore
          element.scrollIntoViewIfNeeded();
          console.log('scrollIntoViewIfNeeded');
        }
      }
    }, 600);
  };
}
