import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatService } from './components/chat/chat.service';
import { ChatResolver } from './components/chat/chat.resolver';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    UserPanelComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ChatService,
    ChatResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
