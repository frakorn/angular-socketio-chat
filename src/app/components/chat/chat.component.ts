import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: { [key: string]: any }[];
  message: string;
  username: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.messages = [];
    this.username = this.chatService.getUsername();
    this.chatService
      .getMessages()
      .subscribe((message) => {
        console.log('message',message)
        this.messages.push(message)
      });
  }

  sendMessage() {
    const msg = {'username':this.username, 'message':this.message}
    this.chatService.sendMessage(msg);
    this.message = '';
  }

}
