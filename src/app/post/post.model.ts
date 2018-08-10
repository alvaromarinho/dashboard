import { Tag } from "../tag";

export class Post {
    constructor(
        id?: number,
        user_id?: number,
        situation_id?: number,
        title?: string,
        content?: string,
        date?: string,
        tags?: Tag[],
    ) { }
}