import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { QRScannerStatus, QRScanner } from '@ionic-native/qr-scanner';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the BarcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html',
})
export class BarcodePage {
  scanData : {};
options :BarcodeScannerOptions;
  scannedCode = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner,private api:ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BarcodePage');
    // this.scan();
  }
  scan(){
    this.options = {
        prompt : "Scan your barcode "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

        console.log(barcodeData);
        this.scanData = barcodeData;
        this.api.enrollStudent(barcodeData.text)
        this.navCtrl.push('MyclassesPage');
    }, (err) => {
        console.log("Error occured : " + err);
        this.navCtrl.push('BarcodePage');
    });         
}    
}
