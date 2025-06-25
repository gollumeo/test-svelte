import { FetchHttpClient } from "@infrastructure/Fetch/Clients/FetchHttpClient";
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
            ok: true,
            json: vi.fn().mockResolvedValue(dummyData)
        }) as never;

        const client: IFetchClient = new FetchHttpClient();
        const result: object[] = await client.get('https://example.com/todos');

        expect(global.fetch).toHaveBeenCalledWith('https://example.com/todos');
        expect(result).toBe(dummyData);
    });

    it('should throw if fetch fails', async (): Promise<void> => 
    {
        global.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

        const client: IFetchClient = new FetchHttpClient();
        await expect(client.get('https://example.com')).rejects.toThrow('Network Error');
    });

    it('should throw with status and statusText if request fails', async (): Promise<void> => 
    {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        });

        const client: IFetchClient = new FetchHttpClient();

        await expect((): Promise<object[]> =>
            client.get("https://dummyjson.com/todos")
        ).rejects.toThrow("Network Error: 404 — Not Found");
    })
})