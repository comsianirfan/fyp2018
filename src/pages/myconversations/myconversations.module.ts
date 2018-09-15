import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyconversationsPage } from './myconversations';
import { ChatService } from '../../providers/chat-service';
import { EmojiProvider } from '../../providers/emoji';
import { RelativeTime } from '../../pipes/relative-time';

@NgModule({
  declarations: [
    MyconversationsPage,
    RelativeTime
  ],
  imports: [
    IonicPageModule.forChild(MyconversationsPage),
  ],
  exports: [
    MyconversationsPage
  ],
  providers: [
    ChatService,
    EmojiProvider
  ]
})
export class MyconversationsPageModule {}
