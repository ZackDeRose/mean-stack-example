import {Component, OnInit} from "@angular/core";
import {MessageService} from "./message.service";
import {Message} from "./message.model";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit{
    message: Message;

    constructor(private messageService: MessageService){}

    ngOnInit(): void {
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => {
                console.log('msg received in message input component');
                this.message = message;
            }
        )
    }

    onSubmit(form: NgForm) {
        if(this.message){
            console.log('editing existing message');
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(
                    result => console.log(result)
                )
            this.message = null;
        } else {
            console.log('submitting new message');
            const message = new Message(form.value.content, 'Zack');
            this.messageService.addMessage(message)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error),
                );
            form.resetForm();
        }
    }

    onClear(form: NgForm){
        this.message = null;
        form.resetForm();
    }
}