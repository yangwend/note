export {};

declare global {
  interface Window {
    // eslint-disable-next-line camelcase,spellcheck/spell-checker
    // flutter_inappwebview: {
    //   callHandler: (method: string, payload: string) => void;
    // };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // wx: any;
    // eslint-disable-next-line camelcase,spellcheck/spell-checker
    // __wxjs_environment?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // AlipayJSBridge: any;
    wx: any;
  }
  interface UnknownTypeObject {
    [key: string]: unknown;
  }
  interface Dictionary<T = unknown> {
    [key: string]: T;
  }
}
