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

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.messages = [];
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        console.log('message',message)
        this.messages.push({name:'Inic',message:message})
      });


  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
