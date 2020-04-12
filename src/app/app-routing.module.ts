import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { ChatResolver } from './components/chat/chat.resolver';

const routes: Routes =  [
  { path: 'user', component: UserPanelComponent },
  { path: 'chat', component: ChatComponent, resolve: { username: ChatResolver }},
  { path: '', component: UserPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
