import { Component } from '@angular/core';
import { NavController, LoadingController, MenuController, NavParams, Events, IonicPage } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, private helper:HelperProvider,private auth:AuthProvider,private api:ApiProvider,
    public navParams: NavParams) {
  }


  user={
    uid:'',
    rollno:'',
    email:'',
    password:''
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  goLogin(){
    this.navCtrl.pop();
  }
  

  signup(){
    this.auth.signup(this.user.email, this.user.password).then(user=>{
      this.user.uid = user.user.uid;
      this.api.addUser(this.user.uid, this.user).then(added=>{
        localStorage.setItem('uid', this.user.uid);
        this.navCtrl.setRoot('DashboardPage');
      }, onerror=>{
        console.log(onerror);
        this.helper.presentBottomToast(onerror.message)
      })
    },error=>{
      console.log(error);
      this.helper.presentBottomToast(error.message)
    })
  }

}
