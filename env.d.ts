declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    JWT_SECRET: string;
    PORT: string;
    ADMIN_PASSWORD: string;
    ADMIN_EMAIL: string;
    EMAIL_USER: string;
    EMAIL_PASS: string
  }
}