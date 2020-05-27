export type Response<T> =  {
    errno: number;
    errmsg: string;

    data: T;
} | Error;
