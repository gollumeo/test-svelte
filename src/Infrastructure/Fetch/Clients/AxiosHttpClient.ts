import type { IFetchClient } from "@infrastructure/Fetch/Contracts/IFetchClient";
import axios, { type AxiosError, type AxiosResponse } from "axios";

export class AxiosHttpClient implements IFetchClient
{
    async get(url: string): Promise<object[]>
    {
        try 
        {
            const result: AxiosResponse = await axios.get(url);
            return result.data;
        }
        catch (error: unknown) 
        {
            const axiosError = error as AxiosError;

            const status = axiosError.response?.status ?? 'unknown';
            const reason = axiosError.response?.statusText ?? axiosError.message ?? 'unknown error';

            throw new Error(`Axios Error: ${ status } — ${ reason }`)
        }
    }
}