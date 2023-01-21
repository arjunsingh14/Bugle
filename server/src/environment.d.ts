

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      MONGO_URI: string;
      PORT?: string;
      JWT_LIFETIME: string;
      JWT_SECRET: string | undefined;
    }
  }
}
declare module "express-async-errors";
export {};