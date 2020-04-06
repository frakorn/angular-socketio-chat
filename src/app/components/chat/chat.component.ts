import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: { [key: string]: any }[];

  constructor() { }

  ngOnInit() {
    this.messages = [{
      name: 'George Clooney',
      message: "The only failure is not to try"
    }, {
      name: 'Seth Rogen',
      message: "I grew up in Vancouver, man. That's where more than half of my style comes from."
    }, {
      name: 'John Lydon',
      message: "There's nothing glorious in dying. Anyone can do it."
    }];
  }

}
