import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";

@Injectable()
export class ChatService {
    private url = 'http://192.168.1.111:3000';
    private socket;  
    private username;  

    constructor() { 
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
        debugger
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }

    public getUsers = () => {
        return Observable.create((observer) => {
            this.socket.on('new-user', (user) => {
                observer.next(user);
            });
        });
    }    
}