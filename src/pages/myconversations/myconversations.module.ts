import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyconversationsPage } from './myconversations';

@NgModule({
  declarations: [
    MyconversationsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyconversationsPage),
  ],
})
export class MyconversationsPageModule {}
