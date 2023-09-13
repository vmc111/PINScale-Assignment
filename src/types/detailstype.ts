export type Status = "INITIAL" | "SUCCESS" | "FAILED" | "LOADING"
export type Details = 
  {
    secretToken: string;
    username: string | undefined;
    userId: number | undefined;
    isAdmin: boolean;
} | undefined