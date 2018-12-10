import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import {map} from 'rxjs/operators';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the QuizpanelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quizpanel',
  templateUrl: 'quizpanel.html',
})
export class QuizpanelPage {
  quizId;
  quiz:any=[];
  Marks=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private api:ApiProvider,private helper:HelperProvider,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizpanelPage');
    this.api.getQuiz(localStorage.getItem('quizid')).subscribe(res=>{
      console.log(res);
      this.quiz=res;
    })
  }

  submitQuiz(val){
    if(val.correctans==this.quiz.correct1){
      console.log("answer is correct");
      this.Marks=this.Marks+1
    }
    else
    {
      console.log("Answer is wrong")
      this.Marks=this.Marks;
    }
    if(val.correctans2==this.quiz.correct11){
      console.log("answer is correct");
      this.Marks=this.Marks+1
    }
    else{
      console.log("Answer is wrong")
      this.Marks=this.Marks;
    }

    if(val.correctans3==this.quiz.correct111){
      console.log("answer is correct");
      this.Marks=this.Marks+1
    }
    else{
      console.log("Answer is wrong")
      this.Marks=this.Marks;
    }
    if(val.correctans4==this.quiz.correct1111){
      console.log("answer is correct");
      this.Marks=this.Marks+1
    }
    else{
      console.log("Answer is wrong")
      this.Marks=this.Marks;
    }

    if(val.correctans5==this.quiz.correct11111){
      console.log("answer is correct");
      this.Marks=this.Marks+1
    }
    else{
      console.log("Answer is wrong")
      this.Marks=this.Marks;
    }


    console.log(this.Marks)

val.title=this.quiz.title;
val.quizId=localStorage.getItem('quizid');
val.classId=this.quiz.classId;
val.creatorId=this.api.studentId;
val.Marks=this.Marks;

this.api.submitQuiz(val);

    this.api.assignMarks(this.quiz.title,this.Marks).then(r=>{
      let alert = this.alertCtrl.create({
        title: 'MARKS',
        message: 'You got'+this.Marks,
        buttons: [
          
          {
            text: 'OK',
            handler: () => {
            
              this.navCtrl.push('QuizPage');
            }
          }
        ]
      });
      alert.present();
    })
    
  }


}
