import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {map} from 'rxjs/operators'
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

  constructor(public navCtrl: NavController,private api:ApiProvider,
     public navParams: NavParams) {
  }

  classes:any;
  ionViewDidLoad() {
    this.getClasses();
    console.log('ionViewDidLoad MyclassesPage');
  }

  goClass(c){
    this.navCtrl.push('MyclassPage', c);
  }


  getClasses(){
    return this.api.getAllClasses().pipe(map(actions => actions.map(a =>{
            const data = a.payload.doc.data() ;
            const id = a.payload.doc.id;
            return {id, ...data};
          
    }))).subscribe(resp=>{
      console.log(resp);
      this.classes = resp;
    })
  }


}
