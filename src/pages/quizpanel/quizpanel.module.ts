import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizpanelPage } from './quizpanel';

@NgModule({
  declarations: [
    QuizpanelPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizpanelPage),
  ],
})
export class QuizpanelPageModule {}
