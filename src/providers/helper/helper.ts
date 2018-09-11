import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from 'ionic-angular';

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {

  constructor(private alertCtrl:AlertController, public loadingCtrl: LoadingController,
     private toastCtrl:ToastController) {
    console.log('Hello HelperProvider Provider');
  }




  
  presentConfirm(title,message,successButton, cancelButton, onsuccess,oncancel) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: cancelButton,
          role: 'cancel',
          handler: oncancel
        },
        {
          text: successButton,
          handler:onsuccess
        }
      ]
    });
    alert.present();
  }


  
  presentToast(msg,dur,pos) {
    let t = this.toastCtrl.create({
      message: msg,
      duration: dur || 3000,
      position: pos || 'bottom'
    });
  
    t.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    t.present();
  }

  presentBottomToast(msg){
    this.toastCtrl.create({
      message:msg,
      duration:2300,
      position:'bottom'
    }).present();
  }
  
}
