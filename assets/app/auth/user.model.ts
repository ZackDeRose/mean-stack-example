/**
 * Created by zackd on 10/28/2017.
 */

export class User {
    constructor(
        public email: string,
        public password: string,
        public firstName?: string,
        public lastName?: string
    ) {}
}