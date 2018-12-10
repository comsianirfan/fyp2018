import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {map} from 'rxjs/operators'
import { HelperProvider } from '../../providers/helper/helper';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the BadgePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-badge',
  templateUrl: 'badge.html',
})
export class BadgePage {
user;
Badge;
  constructor(public navCtrl: NavController, private api:ApiProvider,private helper:HelperProvider,
    public navParams: NavParams,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BadgePage');
    this.getUser();
    
  }


  getUser(){
    this.api.getStudentProfile(localStorage.getItem('uid')).subscribe(response=>{
      console.log(response);
      this.user = response;
      this.checkBadge();
    })
  }

  checkBadge(){
    if(this.user.val<10){
     
      console.log("YOU HAVE NO BADGE");
      this.Badge="Starter"
      let a = this.alertCtrl.create({
        title: 'BADGE ALERT',
        subTitle: 'YOU HAVE NO BADGE YET',
        buttons: ['Dismiss']
      });
      a.present();
    }
    if(this.user.val==10){
     
      console.log("You got level 1 badge");
      this.Badge="Level 1"
      let alert = this.alertCtrl.create({
        title: 'BADGE ALERT',
        subTitle: 'You got level 1 badge',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    if(this.user.val==20){
     
      console.log("You got level 2 badge");
      this.Badge="Level 2"
      let alertt = this.alertCtrl.create({
        title: 'BADGE ALERT',
        subTitle: 'You got level 2 badge',
        buttons: ['Dismiss']
      });
      alertt.present();
    }
    if(this.user.val==30){
     
      console.log("You got level 3 badge");
      this.Badge="Level 3"
      let alerta = this.alertCtrl.create({
        title: 'BADGE ALERT',
        subTitle: 'You got level 3 badge',
        buttons: ['Dismiss']
      });
      alerta.present();
    }
    if(this.user.val==40){
     
      console.log("You got level 4 badge");
      this.Badge="Level 4"
      let alertx = this.alertCtrl.create({
        title: 'BADGE ALERT',
        subTitle: 'You got level 4 badge',
        buttons: ['Dismiss']
      });
      alertx.present();
    }
  }
  }
  
