import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { HelperProvider } from '../../providers/helper/helper';


/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  constructor(public navCtrl: NavController,private helper:HelperProvider,
     private qrScanner: QRScanner,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
    this.scan();
  }


  scanx(){
   let scanner=this.qrScanner.scan().subscribe(resp=>{
      console.log(resp);
      this.helper.presentBottomToast(resp);
      scanner.unsubscribe();
      
    })
  }



  scanme(){
this.qrScanner.scan().subscribe((text: string) => {
  console.log('Scanned something', text);
  this.helper.presentToast(text,5000,'bottom');
      //this.qrScanner.hide(); // hide camera preview
         //scanSub.unsubscribe(); // stop scanning
},err=>{
  this.helper.presentBottomToast(err);
});
  }


  scan(){
    
// Optionally request the permission early

       // camera permission was granted


       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);
         this.helper.presentToast(text,5000,'bottom')

         //this.qrScanner.hide(); // hide camera preview
         //scanSub.unsubscribe(); // stop scanning
       });

    
  
  //.catch((e: any) => console.log('Error is', e));
  }
}
