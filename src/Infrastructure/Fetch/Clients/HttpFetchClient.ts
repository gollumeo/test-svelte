import type { IFetchClient } from "@infrastructure/Fetch/Contracts/IFetchClient";

export class HttpFetchClient implements IFetchClient
{
    async get(url: string): Promise<object[]>
    {
        const response: Response = await fetch(url);
        return response.json();
    }
}