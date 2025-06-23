import type { IRetrieveTodos } from "@application/Contracts/IRetrieveTodos";

export class RetrieveTodos implements IRetrieveTodos
{
    execute(): Promise<object[]>
    {
        return Promise.resolve([]);
    }

}