import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import {map} from 'rxjs/operators'
/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  class;
  classId;
  teacherId;
  text;
  teacher:any = {};
  Message:any[]=[];
  senderId;
  sid;
  disc;
  tid;
  sname:any=[];
    Msgs:any = [];
    Dmsg:any=[];
    Tmsg:any=[];
    m;
    d;
    fd;
    date;
  constructor(public navCtrl: NavController, public navParams: NavParams,private api:ApiProvider,private helper:HelperProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    let id = localStorage.getItem('cid');
  this.classId = id;
  this.date=new Date();
  this.m=this.date.getUTCMonth(),
  this.d=this.date.getUTCDate(),
  this.fd=this.d+"."+this.m;
  this.getStudentClass(id);
  this.getStudent();
 this.sid=this.api.studentId;
 
  }
  getStudentClass(id){
    let vm = this;
    this.api.getStudentClass(id).subscribe(res=>{
      vm.class =res;
      
      this.getTeacherName(vm.class.teacherId); 
    
      this.tid=vm.class.teacherId;
      this.getMyMessages(this.api.studentId,this.tid)

      
    })
    
 }
  getTeacherName(teacherId){
  
    this.api.getTeacherProfile(teacherId).subscribe(res=>{
      this.teacher=res;
      console.log("Calling From Teacher Name: "+this.teacher.firstName);
      
  
    })
  }
  
  
  getMyMessages(sid,tid){
    console.log("Calling again Student check"+sid);
    console.log("Calling again fro check"+tid);
  
  this.api.getMyMessages(sid,tid).subscribe(data =>{
    this.Msgs=data;
    console.log(this.Msgs.sent);
   
      this.Dmsg=this.Msgs.sent;
      this.Tmsg=this.Msgs.reply;
    
    

    
    console.log(this.Dmsg);
   console.log(this.Tmsg);
    // return this.Msgs['sent'];
  
  })
  
      // console.log(this.disc.message)
    
    // let vm = this;
  // setTimeout(function(){
  //   console.log("Inside Timeout");
  //   console.log(vm.Msgs);
  // },2000)
    // this.api.getMyMessages(this.sid,this.classId)
    // .subscribe(resp => {
    //   console.log(resp);
    //   this.Msgs = resp["sent"];
     
    //   // console.log(this.disc.message)
    // });
    
  }
  
  getStudent(){
    this.api.getStudentProfile(localStorage.getItem('uid')).subscribe(res=>{
      this.sname=res;
      console.log("Calling From Student Name: "+this.sname.firstName+this.sname.lastName);
      
  
    })
  }
  
  
  
  submitReply(val) {
    console.log(val.message);
    let minutes =new Date().getMinutes();
  val.senderId=this.api.studentId;
  val.teacherId=this.class.teacherId;
  //val.message=this.message;
  val.classId=this.classId;
  val.className=this.class.courseName;
  val.date=this.fd;
  val.sname=this.sname.firstName+this.sname.lastName;
    
    val.startTime = new Date().getHours() +'::'+minutes;
    
   
  
    this.api.sendText(val,val.message).then(res => {
  
    }, err => {
      console.log(err);
    });
  
  }

}
