declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;

    GOOGLE_ID: string;
    GOOGLE_SECRET: string;

    PHONE_NUMBER_MAIN:string;
  }
}
