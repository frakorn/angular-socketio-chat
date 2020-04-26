import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

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

  constructor(private chatService: ChatService, 
    private router: Router ) { }

  ngOnInit() {
    this.chatService.init();
    this.username = this.chatService.getUsername();
    this.subscriptions.push(
      this.chatService.getMessages().subscribe((message) => {
        this.messages.push(message)
        this.scrollWindow();
      }),
      this.chatService.updateUsers().subscribe((userList) => this.users = userList)
    )
    this.chatService.noticeNewUser(this.username);
    this.ping();
  }

  ping(){
    this.timerInterval = setInterval(() => this.chatService.ping(),5000);
  }

  scrollWindow(){
    const messagePanel = document.getElementById('message-panel');
    setTimeout(()=> messagePanel.scrollTo(0,messagePanel.scrollHeight),100)
  }

  sendMessage() {
    if(this.message){
      const msg = { 'username': this.username, 'message': this.message }
      this.chatService.sendMessage(msg);
      this.message = '';  
    }
  }

  gotoDraw(){
    this.router.navigate(['/draw'])
  }

  logout(){
    this.chatService.logout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    clearInterval(this.timerInterval);
  }


}
