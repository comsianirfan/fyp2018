import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import {map} from 'rxjs/operators'
import { FileOpener } from '@ionic-native/file-opener';
import { UploadassignmentPage } from '../uploadassignment/uploadassignment';
import { Base64 } from '@ionic-native/base64';
import { FileChooser } from '@ionic-native/file-chooser';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
/**
 * Generated class for the MyassignmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myassignments',
  templateUrl: 'myassignments.html',
})
export class MyassignmentsPage {
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

  assignments;
  classId;
  student;
  class;
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyassignmentsPage');
    this.classId = localStorage.getItem('cid');
    console.log(this.navParams.data);
    if(this.classId){
      this.getAssignments(this.classId);
      this.getClass();

    }
  }

  public openWithInAppBrowser(url : string){
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
}
  getClass(){
    this.api.getClass(this.classId).subscribe(r=>{
      this.class =r;
    })
  }
  getAssignments(classId){
    this.api.getClassAssignments(classId).pipe(map(actions => actions.map(a =>{
      const data = a.payload.doc.data() ;
      const id = a.payload.doc.id;
      return {id, ...data};
    
}))).subscribe(resp=>{
  this.assignments = resp;
})
  }


  openFile(){
    this.fileOpener.open('path/to/file.pdf', 'application/pdf')
  .then(() => console.log('File is opened'))
  .catch(e => console.log('Error opening file', e));
  }

  presentUploadModal(assignment) {
    //uploading a file 
    console.log(`opening modal`)
    this.navCtrl.push('UploadassignmentPage', {
      assignment:assignment,
      classId: this.classId
    })
  }

  fileUpload(assignment){
    //file chooser
    this.fileChooser.open().then(uri=>{
      //convert to base64
      this.base64.encodeFile(uri).then(data=>{
        //upload to storage  returns 'file'
        let file ='';
        this.helper.presentBottomToast(`Ready to upload assignment`);
        /* 
        .
        .
        .
        */
         
        //upload to database 
        this.api.getUser(localStorage.getItem('uid')).subscribe(st=>{
          this.student = st;
                let year = new Date().getFullYear();
        let final={
          type:'assignment',
          typeId: assignment.id,
          studentId:localStorage.getItem('uid'),
          classId: this.classId,
          file: file,
          studentName:this.student.name,
          rollno:this.student.rollno,
          className: this.class.courseName,
          batch: year,
          teacherId: this.class.teacherId,
        }
        this.api.uploadSolutionAssignment(final);


        })
  
      })
    })

    
  }

}
