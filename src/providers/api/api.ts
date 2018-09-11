import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {


  user;

  constructor(public http: HttpClient,private afs:AngularFirestore) {
    console.log('Hello ApiProvider Provider');
  }


  /* USER */

  //Create 
  addUser(uid,data){
    return this.afs.doc('students/'+uid).set(data);
  }
  //Read 
  getUser(uid){
    return this.afs.doc('students/'+uid).snapshotChanges();
  }
  // update
  updateUser(uid,data){
    return this.afs.doc('students/'+uid).update(data);
  }
  //delete
  deleteUser(uid){
    return this.afs.doc('students/'+uid).delete();
  }


  /* CLASSES */


}
