import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import {map} from 'rxjs/operators'
import { FileOpener } from '@ionic-native/file-opener';
import { UploadassignmentPage } from '../uploadassignment/uploadassignment';
import { Base64 } from '@ionic-native/base64';
import { FileChooser } from '@ionic-native/file-chooser';
import * as $ from "jquery";

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,
    private fileOpener: FileOpener, private api:ApiProvider,private helper:HelperProvider,
    public navParams: NavParams,private fileChooser: FileChooser,private base64: Base64) {
  }
  public id;
  Answers;
  question;
  good;
  bad;
  ansid;
  num;
  selectedAnswer;
  answer;
said;
add=1;
aid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
    this.id=localStorage.getItem('qid');
    this.getQuestion();
this.getAnswer(this.id);
  }

submitAnswer(val){
  console.log(val);

  val.qid = this.id;
        val.startDate = new Date().getUTCDate();
        val.aid = this.aid;
        val.good=0;
        // val.classId = this.classId;
        // val.qid=this.qid;
    
        this.api.addAnswer(val).then(res => {
    
        }, err => {
          console.log(err);
        });
}

voteUp(selectedAnswer) {
  console.log(selectedAnswer.id)
  selectedAnswer.good=selectedAnswer.good+1;
  console.log(selectedAnswer.good)
  
  // val.good=val.good+1;
  // let c=this.num;
  // console.log(c)
   this.api.voteUp(selectedAnswer.id,selectedAnswer).then(res=>{
  
    console.log("value update"+selectedAnswer.good);
    selectedAnswer={};  
     });}



  getQuestion(){
    this.api.getQuestion(this.id).subscribe(res=>{
      this.question=res;
      console.log(this.question)
    })
  
  }

getAnswer(id){
  this.api.getAllAnswers(this.id).pipe(map(actions => actions.map(a =>{
    const data = a.payload.doc.data() ;
    const id = a.payload.doc.id;
    return {id, ...data};
  
}))).subscribe(resp=>{
this.Answers = resp;
})

}
}


