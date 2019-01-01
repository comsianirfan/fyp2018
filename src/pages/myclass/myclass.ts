import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {DiscussionsPage} from '../../pages/discussions/discussions';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the MyclassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myclass',
  templateUrl: 'myclass.html',
})
export class MyclassPage {

  constructor(public navCtrl: NavController, private api:ApiProvider,
    public navParams: NavParams,private alertCtrl: AlertController) {
  }
  time;
  start=9.00
  end=17.00
  class;
  teacher:any=[];
  ionViewDidLoad() {
    let d=new Date();
    let h=d.getHours();
    let m=d.getMinutes();
    this.time=h+'.'+m;
    console.log('ionViewDidLoad MyclassPage');
    //  this.class =this.navParams.data;
     console.log(this.class);
this.getClass()
    // this.class= this.api.getClass(this.class.id);
  }

  getClass(){
    this.api.getStudentClass(localStorage.getItem('cid')).subscribe(response=>{
      this.class=response;
      this.api.getTeacherProfile(this.class.teacherId).subscribe(res=>{
        this.teacher=res;
        console.log(this.teacher);
        this.start=this.teacher.startTime;
        this.end=this.teacher.endTime;
            })
    })
  }


 
  go(page){
      this.navCtrl.push(page, this.class);
   
  }
  details(){
   
    
    if(this.time>=this.start&&this.time<=this.end){
      
      this.api.sendMsg(this.class.teacherId).then(res=>{this.navCtrl.push("MessagePage");})
   }
   else{
    let alert = this.alertCtrl.create({
      title: 'Teacher not availaible',
      subTitle: 'contact in official hours',
      buttons: ['Dismiss']
    });
    alert.present();
   }
 }
}
