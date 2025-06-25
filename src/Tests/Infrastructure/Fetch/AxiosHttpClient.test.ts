import { AxiosHttpClient } from "@infrastructure/Fetch/Clients/AxiosHttpClient";
import type { IFetchClient } from "@infrastructure/Fetch/Contracts/IFetchClient";
import axios, { type AxiosError } from "axios";
import { expect, vi } from "vitest";

vi.mock('axios');

describe('AxiosHttpClient', (): void => 
{
    beforeEach((): void => 
    {
        vi.resetAllMocks();
    });

    it('should fetch data and return parsed JSON', async (): Promise<void> => 
    {
        const dummyData: object[] = [{ id: 1, title: "test" }];
        vi.mocked(axios.get).mockResolvedValue({ data: dummyData });

        const client: IFetchClient = new AxiosHttpClient();
        const result = await client.get('https://example.com/todos');

        expect(axios.get).toHaveBeenCalledWith('https://example.com/todos');
        expect(result).toBe(dummyData);
    });

    it('should throw if axios throws', async (): Promise<void> => 
    {
        vi.mocked(axios.get).mockRejectedValue({
            isAxiosError: true,
            response: { status: 404, statusText: 'Not Found' },
            message: 'Request failed with status code 404',
            toJSON: () => ({}),
        } as Partial<AxiosError>);

        const client: IFetchClient = new AxiosHttpClient();

        await expect(
            client.get('https://example.com/todos')
        ).rejects.toThrow(`Axios Error: 404 — Not Found`);
    })
})