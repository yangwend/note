
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly mode: string;
  readonly VITE_API_ENV: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
