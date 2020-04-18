import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router'

@Injectable()
export class ChatService {
    private url = 'http://192.168.1.111:3000';
    private socket;  
    private username;  
    private colors = ['#F68C40','#8F83F3','#E76651','#519BE2','#F37298','#7BB46C','#265CD4','#02B9A0','#F80000','#2F3035'];
    private userColors = [];

    constructor(private router: Router) { 
        this.socket = io(this.url)
    }

    public noticeNewUser(user){
        this.socket.emit('new-user', user);
    }

    public setUsername(username){
        this.username = username;
    }

    public getUsername(){
        return this.username;
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                message.color = this.userColors.find(u => u.username === message.username)['color']
                observer.next(message);
            });
        });
    }

    public getUsers = () => {
        return Observable.create((observer) => {
            this.socket.on('new-user', (newUser) => {
                const color = this.colors[Math.floor(Math.random() *  9)];
                const user = {'username':newUser, 'color':color}
                this.userColors.push(user)
                observer.next(user);
            });
        });
    } 
    
    public userLeave = () => {
        return Observable.create((observer) => {
            this.socket.on('user-leave', (user) => {
                observer.next(user);
            });
        });
    }     

    public logout(){
        localStorage.setItem('username','');
        this.socket.emit('user-leave', this.username);
        this.router.navigate(['/user'])
    }
}