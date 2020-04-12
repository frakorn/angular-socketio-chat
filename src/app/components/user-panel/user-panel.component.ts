import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat/chat.service'
import { Router } from "@angular/router";
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  animations: [
    trigger(
      'fadeFromTop',
      [
        transition(
          ':enter', [
            style({ opacity:0,transform: 'translate3d(0, -100%, 0)' }),
            animate('1s', style({ opacity: 1, transform: 'none' })),
          ]
        )])]
})


export class UserPanelComponent implements OnInit {

  username: string;

  constructor(private chatService: ChatService,
    private router: Router) { }

  setUsername() {
    this.chatService.setUsername(this.username);
    this.router.navigate(['/chat'])
  }

  ngOnInit() {
  }

}
