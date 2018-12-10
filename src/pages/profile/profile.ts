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

  user;
  
  constructor(public navCtrl: NavController, private api:ApiProvider,private helper:HelperProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getUser();
  }


  getUser(){
    this.api.getStudentProfile(localStorage.getItem('uid')).subscribe(response=>{
      console.log(response);
      this.user = response;
    })
  }
  
  resetPass(email){
  
        this.api.resetPassword(email);
      
    }

  updateProfile(){
    this.api.updateUser(localStorage.getItem('uid'), this.user).then(response=>{
      this.helper.presentBottomToast(`User profile Updated!`)
    })
  }

}
