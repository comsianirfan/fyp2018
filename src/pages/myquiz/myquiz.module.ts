import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyquizPage } from './myquiz';

@NgModule({
  declarations: [
    MyquizPage,
  ],
  imports: [
    IonicPageModule.forChild(MyquizPage),
  ],
})
export class MyquizPageModule {}
