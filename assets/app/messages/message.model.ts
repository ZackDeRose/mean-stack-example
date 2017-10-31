/**
 * Created by zackd on 10/28/2017.
 */

export class Message {
    constructor(
        public content: string,
        public username: string,
        public messageId?: string,
        public userId?: string){
    }
}
