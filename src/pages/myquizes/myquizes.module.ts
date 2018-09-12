import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyquizesPage } from './myquizes';

@NgModule({
  declarations: [
    MyquizesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyquizesPage),
  ],
})
export class MyquizesPageModule {}
