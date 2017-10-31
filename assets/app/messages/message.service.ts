import {Message} from "./message.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http) {}

    addMessage(message: Message): Observable<Message> {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'})
        console.log(JSON.stringify(message, null, 2));
        return this.http.post('/message', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const newMsg = new Message(result.obj.content, 'Dummy', result.obj._id, null);
                this.messages.push(newMsg);
                return newMsg;
            });
    }

    getMessages(): Observable<Message[]> {
        return this.http.get('message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for(let message of messages) {
                    transformedMessages.push(new Message(message.content, 'Dummy', message._id, null));
                }
                this.messages = transformedMessages;
                return transformedMessages;
            });
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message){
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'})
        return this.http.patch('message/' + message.messageId, body, {headers: headers})
            .map((response: Response) => response.json());
    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
        return this.http.delete('message/' + message.messageId)
            .map((response: Response) => response.json());
    }
}