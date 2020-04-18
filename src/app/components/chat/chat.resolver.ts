import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';

@Injectable()
export class ChatResolver implements Resolve<any> {

  constructor( 
    private chatService: ChatService,
    private router: Router ) { }

  resolve(){
    if(localStorage.getItem('username'))
      this.chatService.setUsername(localStorage.getItem('username'))
    if(!this.chatService.getUsername())
        this.router.navigate(['/user'])
  }
}