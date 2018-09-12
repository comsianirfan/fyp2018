import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyassignmentsPage } from './myassignments';

@NgModule({
  declarations: [
    MyassignmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyassignmentsPage),
  ],
})
export class MyassignmentsPageModule {}
