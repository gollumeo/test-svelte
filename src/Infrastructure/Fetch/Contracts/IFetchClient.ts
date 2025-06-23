export interface IFetchClient
{
    get(url: string): Promise<object[]>;
}