export class User {
    constructor(
        public id?: number,
        public username?: string,
        public password?: string,
        public name?: string,
        public bio?: string,
        public situation?: string,
        public photo?: File,
    ) { }
}