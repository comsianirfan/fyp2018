import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyattendancePage } from './myattendance';

@NgModule({
  declarations: [
    MyattendancePage,
  ],
  imports: [
    IonicPageModule.forChild(MyattendancePage),
  ],
})
export class MyattendancePageModule {}
