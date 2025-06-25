import { AxiosHttpClient } from "@infrastructure/Fetch/Clients/AxiosHttpClient";
import type { IFetchClient } from "@infrastructure/Fetch/Contracts/IFetchClient";
import axios from "axios";
import { expect, vi } from "vitest";

vi.mock('axios');

describe('AxiosHttpClient', (): void => 
{
    beforeEach((): void => 
    {
        vi.resetAllMocks();
    })

    it('should fetch data and return parsed JSON', async (): Promise<void> => 
    {
        const dummyData: object[] = [{ id: 1, title: "test" }];
        vi.mocked(axios.get).mockResolvedValue({ data: dummyData });

        const client: IFetchClient = new AxiosHttpClient();
        const result = await client.get('https://example.com/todos');

        expect(axios.get).toHaveBeenCalledWith('https://example.com/todos');
        expect(result).toBe(dummyData);
    })
})