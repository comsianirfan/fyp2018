import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController,private api:ApiProvider,private helper:HelperProvider,
     public navParams: NavParams) {
  }


  user:any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  getProfile(){
    let uid = localStorage.getItem('uid');
    this.api.getUser(uid).subscribe(resp=>{
      console.log(resp);
      this.user = resp;
    })
  }


  update(){
    this.api.updateUser(localStorage.getItem('uid'), this.user).then(up=>{
      this.helper.presentBottomToast(`Profile Updated`);
    },err=>{
      this.helper.presentBottomToast(`Error updating`)
    })
  }

}
