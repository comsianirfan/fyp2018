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
 * Generated class for the DiscussionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-discussions',
  templateUrl: 'discussions.html',
})
export class DiscussionsPage {

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,
    private fileOpener: FileOpener, private api:ApiProvider,private helper:HelperProvider,
    public navParams: NavParams,private fileChooser: FileChooser,private base64: Base64) {
  }
classId;
UserId;
Questions;
qid=Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussionsPage');
    this.classId = localStorage.getItem('cid');
    this.UserId= localStorage.getItem('uid');
this.getQuestions();
    
  }
  addQuestion(){
    //add question modal
    this.helper.presentPrompt('POST QUESTION', [
      {name:'note',placeholder:'Please write question here' }
    ],[
      {text:'Cancel',role:'cancel',handler:data=>{}},
      {text:'Submit',handler:data=>{
        
        this.submitQuestion(data);
      }},
      
    ])

    
    //
  }
  submitQuestion(val){
    // $('#addAssignmentModal').modal('hide')

    console.log(val);

//val.file=this.downloadURL;
// val.urlnew=this.downloadURL;
val.creatorid=this.UserId;
    val.startDate = new Date().getUTCDate();
    val.classId = this.classId;
    val.qid=this.qid;

    this.api.addQuestion(val).then(res=>{

    },err=>{
      console.log(err);
    })

  }


  delete(data){
    this.helper.presentConfirm('Delete', 'Are you sure you want to delete question?', 'DELETE','Cancel',()=>{
      //on success
     
  
   
    //now removing the class
    if(data.creatorid==this.UserId){
      console.log(data.creatorid);
      console.log(this.UserId);
      console.log("ID match")
    this.api.deleteQuestion(data.id)
    }
    else{
      console.log('ID not match');
      alert("you are not an creator of this question")
    }
      
    },()=>{
      //on failure
      console.log(`cancelled`)
    })
  
  }

  goDiscussion(question){
    console.log(question.qid)
    localStorage.setItem('qid',question.qid);
    this.navCtrl.push('QuestionPage');
  }

getQuestions(){
  
  this.api.getAllQuestions(this.classId).pipe(map(actions => actions.map(a =>{
    const data = a.payload.doc.data() ;
    const id = a.payload.doc.id;
    return {id, ...data};
  
}))).subscribe(resp=>{
this.Questions = resp;
})

}
  


}
