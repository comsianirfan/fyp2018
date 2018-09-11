import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormsModule } from '@angular/forms';
import { ApiProvider } from '../providers/api/api';
import { HelperProvider } from '../providers/helper/helper';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClient, HttpClientModule } from '@angular/common/http';

//external 
import { QRScanner } from '@ionic-native/qr-scanner';
import { AndroidPermissions } from '@ionic-native/android-permissions';

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
    HomePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
 

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
    AuthProvider,
    QRScanner,
    AndroidPermissions
  ]
})
export class AppModule {}
