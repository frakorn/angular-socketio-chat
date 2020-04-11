import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatService } from './components/chat/chat.service';


@NgModule({
  declarations: [
    AppComponent,
    UserPanelComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
