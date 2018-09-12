import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyclassesPage } from './myclasses';

@NgModule({
  declarations: [
    MyclassesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyclassesPage),
  ],
})
export class MyclassesPageModule {}
