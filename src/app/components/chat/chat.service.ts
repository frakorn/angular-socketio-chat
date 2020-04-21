import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ChatService {
    private url = `${environment.protocol}://${environment.serverIp}:${environment.port}`
    private socket;  
    private username;  
    private userList = [];

    constructor(private router: Router,
        private toastr: ToastrService ) {}

    public init(){
        this.socket = io(this.url)
        this.socket.on('username-error', (username) => {
            this.toastr.error('Username already exist', '');
            this.logout();
        });
    }

    public setUserList(list){
        this.userList = list;
    }

    public getUserList(){
        return this.userList;
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

    public ping() {
        console.log('user ping')
        this.socket.emit('ping-user', this.username);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                message.color = this.userList.find(u => u.username === message.username)['color']
                observer.next(message);
            });
        });
    }

    public updateUsers = () => {
        return Observable.create((observer) => {
            this.socket.on('update-users', (userListObj) => {
                console.log('update-users',userListObj.action, userListObj.username)
                this.notifyChat(userListObj)
                this.userList = userListObj.userList;
                observer.next(this.userList);
            });
        });
    }  

    private notifyChat(userListObj){
        if(userListObj.action==='new-user')
            this.toastr.success('New User', userListObj.username);
        if(userListObj.action==='user-leave')
            this.toastr.info('User Leave', userListObj.username);
    }

    public logout(){
        this.socket.emit('user-leave', this.username);
        this.username = '';
        this.socket.disconnect();
        this.router.navigate(['/user'])
    }
}