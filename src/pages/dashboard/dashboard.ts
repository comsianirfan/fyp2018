import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController,private api:ApiProvider,
    private helper:HelperProvider,
     public navParams: NavParams) {
  }
  user;

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    console.log(localStorage.getItem('uid'));
    this.getUser();
  }



  logOut(){
    this.helper.presentConfirm('Logout', 'Are you sure you want to logout?', 'LOGOUT','Cancel',()=>{
      //on success
      localStorage.clear();
      this.navCtrl.setRoot('LoginPage');
    },()=>{
      //on failure
      console.log(`cancelled`)
    })
  
  }


  getUser(){
    this.api.getUser(localStorage.getItem('uid')).subscribe(response=>{
      console.log(response);
      this.user = response;
    })
  }

  go(page){
    this.navCtrl.push(page);
  }
 
}
