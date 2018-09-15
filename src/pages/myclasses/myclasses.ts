import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {map} from 'rxjs/operators'
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the MyclassesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myclasses',
  templateUrl: 'myclasses.html',
})

export class MyclassesPage {

  constructor(public navCtrl: NavController,private api:ApiProvider,private helper:HelperProvider,
     public navParams: NavParams) {
  }

  classes:any;
  ionViewDidLoad() {
    this.getClasses();
    console.log('ionViewDidLoad MyclassesPage');
  }

  goClass(c){
    this.api.getClass(c.classId).subscribe(response=>{
      let data= response;
      data.id = c.classId;
      this.navCtrl.push('MyclassPage', data);
    })
  }


  getClasses(){
    return this.api.getStudentClasses(localStorage.getItem('uid'))
    .pipe(map(actions => actions.map(a =>{
            const data = a.payload.doc.data() ;
            const id = a.payload.doc.id;
            return {id, ...data};
          
    }))).subscribe(resp=>{
      console.log(resp);
      this.classes = resp;
    })
  }


  addClass(){
    //search class with ID
    this.helper.presentPrompt('Add Class via ID', [
      {name:'classId',placeholder:'Class ID' }
    ],[
      {text:'Cancel',role:'cancel',handler:data=>{}},
      {text:'JOIN',handler:data=>{
        
        this.joinClass(data.classId);
      }},
      
    ])

    
    //
  }



  joinClass(classId){
    this.helper.load();
    this.api.getClass(classId).subscribe(classData=>{
      if(classData){ /* on correct ID */
        this.api.getUser(localStorage.getItem('uid')).subscribe(studentData=>{
          this.api.joinClass(classId, classData, studentData);
          this.helper.dismiss();
          this.helper.presentBottomToast(`Class Joined!`);
        })
      }else{
        this.helper.presentBottomToast(`Class ID doesnot exist!`)
        this.helper.dismiss();

      }
     
    })
  }
  open(){
    console.log(`open`)
  }

  goBarcode(){
    this.navCtrl.push('BarcodePage')
  }
  
  getItems(ev) {
    // Reset items back to all of the items
    this.classes =this.temp;

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.classes = this.classes.filter((item) => {
        return (item.courseName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  temp;

}
