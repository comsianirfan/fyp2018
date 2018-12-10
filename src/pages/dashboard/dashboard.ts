import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import {HomePage} from '../../pages/home/home';
import {map} from 'rxjs/operators';
import { AlertController } from 'ionic-angular';
import { isRightSide } from 'ionic-angular/umd/util/util';
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
     public navParams: NavParams,private alerter: AlertController) {
  }
  user;
  student;
   latest:any=[""]
alerts:any=[""];

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    console.log(localStorage.getItem('uid'));
    // this.getUser();
    this.api.getUser(localStorage.getItem('uid')).subscribe(resp=>{
      this.student =resp;
      console.log(this.student.firstName);
    
    });
   
    this.getAlerts();
   
  
  }

  getAlerts(){
    return  this.api.getalerts(localStorage.getItem('uid'))
    .subscribe(resp=>{
      console.log(resp);
      this.alerts = resp;
      
      if(this.alerts.alerts!=null){
      let vm=this.alerts.alerts.length;
      this.latest=this.alerts.alerts[vm-1];
      console.log(this.latest);}
      else{
        this.latest=null;
      }
      if(this.latest!=null){
      let alertnew = this.alerter.create({
       
        title: this.latest.id,
        subTitle: this.latest.description,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Hide',
            role:'cancel',
            handler: data => {
         
                console.log("alerts sent to seen list and deleted from here");
                this.api.setSeen(localStorage.getItem('uid'),this.latest).then(res=>{
                  this.api.removeLatest(localStorage.getItem('uid'),this.latest);
                
            this.latest=null;
            console.log("snt in seen");
           
            
                })
             
                // invalid login
                
            }
            
          }
          
        ]
        
      }); 
      alertnew.present();
      
    }
    else{
      console.log('no alerts availaible')
    }
    })
  
    
  }


  

  

  logOut(){
    this.helper.presentConfirm('Logout', 'Are you sure you want to logout?', 'LOGOUT','Cancel',()=>{
      //on success
      localStorage.removeItem('uid');
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
