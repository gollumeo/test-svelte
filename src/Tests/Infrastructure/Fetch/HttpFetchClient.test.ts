import { HttpFetchClient } from "@infrastructure/Fetch/Clients/HttpFetchClient";
import type { IFetchClient } from "@infrastructure/Fetch/Contracts/IFetchClient";
import { beforeEach, describe, expect, vi } from "vitest";

describe('FetchHttpClient', (): void => 
{
    beforeEach((): void => 
    {
        vi.resetAllMocks();
    })

    it('should fetch data and return parsed JSON', async (): Promise<void> => 
    {
        const dummyData: object[] = [{ id: 1, title: 'Test Todo' }];

        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue(dummyData)
        }) as never;

        const client: IFetchClient = new HttpFetchClient();
        const result: object[] = await client.get('https://example.com/todos');

        expect(global.fetch).toHaveBeenCalledWith('https://example.com/todos');
        expect(result).toBe(dummyData);
    })
})