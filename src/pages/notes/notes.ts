import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import {map} from 'rxjs/operators'
import { FileOpener } from '@ionic-native/file-opener';
import { Base64 } from '@ionic-native/base64';
import { FileChooser } from '@ionic-native/file-chooser';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,
    private fileOpener: FileOpener, private api:ApiProvider,private helper:HelperProvider,
    public navParams: NavParams,private fileChooser: FileChooser,private base64: Base64,private theInAppBrowser: InAppBrowser) {
  }
  notes;
  classId;
  student;
  class;
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
    
    this.classId = localStorage.getItem('cid');
    console.log(this.navParams.data);
    if(this.classId){
      this.getNotes(this.classId);
      

    }
  }

  public openWithInAppBrowser(url : string){
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
}

  getNotes(classId){
    this.api.getNotes(classId).pipe(map(actions => actions.map(a =>{
      const data = a.payload.doc.data() ;
      const id = a.payload.doc.id;
      return {id, ...data};
    
}))).subscribe(resp=>{
  this.notes = resp;
})
  }
}
