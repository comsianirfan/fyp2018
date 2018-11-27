import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import {HomePage} from '../../pages/home/home';
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
  student;

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    console.log(localStorage.getItem('uid'));
    // this.getUser();
    this.api.getUser(localStorage.getItem('uid')).subscribe(resp=>{
      this.student =resp;
      console.log(this.student.firstName);
    
    });
  }



  logOut(){
    this.helper.presentConfirm('Logout', 'Are you sure you want to logout?', 'LOGOUT','Cancel',()=>{
      //on success
      localStorage.clear();
     this.navCtrl.push(HomePage);
      
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
