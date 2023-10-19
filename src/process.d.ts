declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;

    GOOGLE_ID: string;
    GOOGLE_SECRET: string;

    URL: string;
    MY_SECRET_VALIDATE_TOKEN: string;
  }
}
