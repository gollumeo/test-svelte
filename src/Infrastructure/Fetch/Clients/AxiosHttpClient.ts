import type { IFetchClient } from "@infrastructure/Fetch/Contracts/IFetchClient";
import axios, { type AxiosResponse } from "axios";

export class AxiosHttpClient implements IFetchClient
{
    async get(url: string): Promise<object[]>
    {
        const result: AxiosResponse = await axios.get(url);
        return result.data;
    }
}