import { RetrieveTodos } from "@application/Queries/RetrieveTodos";
import { describe } from "vitest";

describe('Query: retrieve todos', (): void => 
{
    it('should retrieve 30 todos', async () => 
    {
        const todos: object[] = await new RetrieveTodos().execute();

        expect(todos).toHaveLength(30);
        expect(todos[0]).toHaveProperty('id');
        expect(todos[0]).toHaveProperty('title');
    })
})