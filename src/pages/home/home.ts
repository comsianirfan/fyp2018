import { Component } from '@angular/core';
import { NavController, LoadingController, MenuController, NavParams, Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = {
    email:"student@gmail.com",
    password:"123456789a",
    uid:''
    };
  
  constructor(private api:ApiProvider,
    private helper:HelperProvider,private auth: AuthProvider,
     public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Welcome');
  }

  ionViewWillEnter(){
  //  this.tabsService.hide();
    this.events.publish('conversation:load');
  }

  ionViewWillLeave(){
   // this.tabsService.show();
    this.events.publish('conversation:unload');
  }


  goRegister(){
    this.navCtrl.push('SignupPage')
  }
  // enableMenu(){
  //   this.menu.enable(true);
  // }

  signin() {
    // this.helper.load();
     this.auth.login(this.user.email, this.user.password).then(resp=>{
       //on success authentication
       this.api.getUser(resp.user.uid).subscribe(response=>{
         console.log(resp);
         this.api.user = response; 
         localStorage.setItem('uid', resp.user.uid);
         this.navCtrl.setRoot('DashboardPage').then(()=> this.helper.dismiss()); 
       }, error=>{
        this.helper.presentBottomToast(error.message);

       })
       

     }, err=>{
       this.helper.presentBottomToast(err.message);

     })
}

}
