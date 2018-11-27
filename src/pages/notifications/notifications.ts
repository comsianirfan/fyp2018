import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import {map} from 'rxjs/operators'

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,private api:ApiProvider,private helper:HelperProvider,public navParams: NavParams) {
  }


  notifications;
  classId;
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
    this.classId = localStorage.getItem('cid');
    console.log(this.navParams.data);
    if(this.classId){
      this.getNotifications(this.classId);
      

    }
  }



  getNotifications(classId){
    this.api.getNotifications(classId).pipe(map(actions => actions.map(a =>{
      const data = a.payload.doc.data() ;
      const id = a.payload.doc.id;
      return {id, ...data};
    
}))).subscribe(resp=>{
  this.notifications = resp;
})
  }
}
