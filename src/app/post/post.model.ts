import { Tag } from "../tag";

export class Post {
    constructor(
        public id?: number,
        public user_id?: number,
        public situation_id?: number,
        public title?: string,
        public content?: string,
        public date?: string,
        public tags?: Tag[],
    ) { }
}