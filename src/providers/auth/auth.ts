import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient,private afAuth:AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }


  login(email,password){
   return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }
  signup(email,password){
  return  this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }

}
