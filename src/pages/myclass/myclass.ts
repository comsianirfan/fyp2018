import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {DiscussionsPage} from '../../pages/discussions/discussions';
/**
 * Generated class for the MyclassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myclass',
  templateUrl: 'myclass.html',
})
export class MyclassPage {

  constructor(public navCtrl: NavController, private api:ApiProvider,
    public navParams: NavParams) {
  }

  class;
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyclassPage');
    //  this.class =this.navParams.data;
     console.log(this.class);
this.getClass()
    // this.class= this.api.getClass(this.class.id);
  }

  getClass(){
    this.api.getStudentClass(localStorage.getItem('cid')).subscribe(response=>{
      this.class=response;
    })
  }

  go(page){
      this.navCtrl.push(page, this.class);
   
  }
}
