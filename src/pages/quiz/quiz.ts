import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import {HomePage} from '../../pages/home/home';
import {map} from 'rxjs/operators';
import { AlertController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  selectedQuiz;
  quiz:any=[];
  questions;
  classId;
  studentId;
  id;
  startTime;
  endTime;
  quizDate;
  curTime;
  curDate;
  marks:any=[];
  constructor(public navCtrl: NavController,private api:ApiProvider,
    private helper:HelperProvider,
     public navParams: NavParams,private alertCtrl: AlertController,private datePipe: DatePipe) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
    this.getQuizzes();
    var date = new Date();
    var d=new Date();
    let h=d.getHours();
    let m=d.getMinutes();
    this.curTime=h+'.'+m;
    
    console.log(this.curTime)
this.curDate=this.datePipe.transform(date,"yyyy-MM-dd");;

console.log(this.curDate)

  }



  getQuizzes(){
    this.api.getQuizes(localStorage.getItem('cid'))
    .pipe(map(actions => actions.map(a =>{
      const data = a.payload.doc.data() ;
      const id = a.payload.doc.id;
      return {id, ...data};
    
})))
    .subscribe(resp=>{
      this.quiz =resp;
      console.log(this.quiz)

    })
  }

  Details(x){
  
    if(x.deadline==this.curDate&&this.curTime>=x.stime&&this.curTime<x.etime){
  console.log("Date match");
  localStorage.setItem('quizid',x.id);
  this.navCtrl.push('QuizpanelPage');
    }
    else{
      console.log("Quiz date or time not match")
      let quizalert = this.alertCtrl.create({
        title: 'QUIZ ALERT',
        subTitle: 'Quiz not started yet or has ended see date',
        buttons: ['Dismiss']
      });
      quizalert.present();
    
    }
  }
}
