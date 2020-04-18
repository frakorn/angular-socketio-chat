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
  users = [];
  message: string;
  username: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.username = this.chatService.getUsername();
    this.subscriptions.push(
      this.chatService.getMessages().subscribe((message) => this.messages.push(message)),
      this.chatService.getUsers().subscribe((user) => this.users.push(user)),
      this.chatService.userLeave().subscribe((user) => {
        this.users = this.users.filter(u => u.username !== user);
      })
    )
    this.chatService.noticeNewUser(this.username);
  }

  sendMessage() {
    const msg = { 'username': this.username, 'message': this.message }
    this.chatService.sendMessage(msg);
    this.message = '';
  }

  logout(){
    this.chatService.logout();
  }

  setColor(username){
    return this.users.find(u => u.username == username)['color'];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


}
