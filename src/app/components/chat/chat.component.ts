import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter', animate(1000)),
    ])
  ]
})
export class ChatComponent implements OnInit {

  subscriptions = []
  messages = []
  users = this.chatService.getUserList();
  message: string;
  username: string;
  timerInterval: any;

  constructor(private chatService: ChatService ) { }

  ngOnInit() {
    this.chatService.init();
    this.username = this.chatService.getUsername();
    this.subscriptions.push(
      this.chatService.getMessages().subscribe((message) => this.messages.push(message)),
      this.chatService.updateUsers().subscribe((userList) => this.users = userList)
    )
    this.chatService.noticeNewUser(this.username);
    this.ping();
  }

  ping(){
    this.timerInterval = setInterval(() => this.chatService.ping(),5000);
  }

  sendMessage() {
    const msg = { 'username': this.username, 'message': this.message }
    this.chatService.sendMessage(msg);
    this.message = '';
  }

  logout(){
    this.chatService.logout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    clearInterval(this.timerInterval);
  }


}
