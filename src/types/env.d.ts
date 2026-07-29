// env.d.ts 型別宣告檔案
// declare 全域宣告型別，整個專案不用 import 也能知道
// namespace 命名空間，避免變數名稱重複，當變數名稱重複時，可以包在 namespace 名稱 {} 裡面
declare namespace NodeJS {
  interface ProcessEnv {
    DB_URL: string
    PORT: string
    JWT_SECRET: string
    CLOUDINARY_CLOUD_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
  }
}
