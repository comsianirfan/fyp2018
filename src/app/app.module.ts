import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FlashCardComponent } from '../components/flash-card/flash-card';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DatePipe } from '@angular/common'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormsModule } from '@angular/forms';
import { ApiProvider } from '../providers/api/api';
import { HelperProvider } from '../providers/helper/helper';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClient, HttpClientModule } from '@angular/common/http';

//external 

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Camera } from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FileOpener } from '@ionic-native/file-opener';
import { Base64 } from '@ionic-native/base64';
import { FileChooser } from '@ionic-native/file-chooser';
import { EmojiProvider } from '../providers/emoji';

const firebaseConfig = {
  apiKey: "AIzaSyCKlQfSGOwucl0hBwVMMrEemNVGMaHCQPQ",
  authDomain: "university-management-fyp.firebaseapp.com",
  databaseURL: "https://university-management-fyp.firebaseio.com",
  projectId: "university-management-fyp",
  storageBucket: "university-management-fyp.appspot.com",
  messagingSenderId: "164013187253"
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FlashCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    NgxQRCodeModule // imports firebase/storage only needed for storage features
 

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    HelperProvider,
    EmojiProvider,
    AuthProvider,
    QRScanner,
    FileOpener,
    Base64,
    FileChooser,
    AndroidPermissions,
    Camera,
    QRScanner,
    DatePipe,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    
    
  ]
})
export class AppModule {}
