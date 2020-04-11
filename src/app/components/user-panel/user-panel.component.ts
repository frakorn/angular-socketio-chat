import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat/chat.service'
import {Router} from "@angular/router"

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  username: string;

  constructor(private chatService: ChatService,
    private router: Router) { }

  setUsername(){
    this.chatService.setUsername(this.username);
    this.router.navigate(['/chat'])
  }

  ngOnInit() {
  }

}
