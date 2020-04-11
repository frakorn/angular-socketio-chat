import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';

const routes: Routes =  [
  { path: 'user', component: UserPanelComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', component: UserPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
