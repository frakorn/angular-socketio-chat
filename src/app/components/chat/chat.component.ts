import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { 
  trigger, 
  state, 
  style, 
  transition, 
  animate
} from '@angular/animations';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ])
    ] })
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
