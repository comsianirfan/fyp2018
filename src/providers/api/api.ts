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
    console.log(localStorage.getItem('uid'))
  }


  /* USER */

  //Create 
  addUser(uid,data){
    return this.afs.doc('students/'+uid).set(data);
  }
  //Read 
  getUser(uid){
    return this.afs.doc('students/'+uid).valueChanges();
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

  getAllClasses(){
    return this.afs.collection<any>('classes').snapshotChanges();
  }
  getStudentClasses(studentId){
    return this.afs.collection<any>('student-class', ref=> ref.where('studentId','==',studentId)).snapshotChanges();
  }
  getClass(classId){
    return this.afs.doc<any>('classes/'+classId).valueChanges();
  }
  joinClass(classId,Class, student){
    //first 
    let today = new Date().getDate();
    this.afs.collection('student-class').add({
      studentId:localStorage.getItem('uid'),
      classId:classId,
      studentName:student.name,
      className:Class.courseName,
      date:today,
      rollno:student.rollno,
    });
  }


  /* ASSIGNMENT */
  getClassAssignments(classId){
    return this.afs.collection('assignments', ref=>ref.where('classId','==',classId)).snapshotChanges();
  }

  uploadSolutionAssignment(data){
    /* studentId, classId, teacherId, assignmentsId */
    return this.afs.collection('students-assignments').add(data)
  }



  /* QUIZES */
  getClassQuizes(classId){
    return this.afs.collection<any>('quizes', ref=>ref.where('classId','==',classId)).snapshotChanges();
  }

  /* NOTES */
  getClassNotes(classId){
    return this.afs.collection<any>('notes', ref=>ref.where('classId','==',classId)).snapshotChanges();
  }



  /* CONVERSATIONS */

  getClassMessages(classId){
    return this.afs.collection('conversations', ref=> ref.where('classId','==',classId)).snapshotChanges();
  }
  sendMessage(classId, convo){
    return this.afs.doc('conversations/'+classId).update(convo);
  }

}
