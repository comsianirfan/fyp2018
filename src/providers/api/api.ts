import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {


  user;
studentId
  constructor(public http: HttpClient,private afs:AngularFirestore) {
    console.log('Hello ApiProvider Provider');
    console.log(localStorage.getItem('uid'));
    this.studentId=localStorage.getItem('uid');

  }




  enrollStudent(classId) {
    return this.afs.collection('classes').doc(classId).update({
      'students':
        firebase.    firestore.FieldValue.arrayUnion(this.studentId)
  
      // students : this.studentId
    }
    );
  }

  getStudentClasses(studentId) {
    return this.afs.collection('classes', ref => ref.where('students', 'array-contains', this.studentId)).snapshotChanges();
   
   }
   
   getStudentClass(classId) {
     return this.afs.doc('classes/' + classId).valueChanges();
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
  //Class notifications
  getNotifications(classId) {
    return this.afs.collection('notification', ref => ref.where('classId', '==', classId)).snapshotChanges();
  }

//////////Discussion Panel Code////////////
getQuestion(qid) {
  return this.afs.collection('discussion', ref => ref.where('qid', '==', qid)).valueChanges();
}



// Post Question
addQuestion(data) {
  return this.afs.collection('discussion').add(data);
}

// Post Answer
addAnswer(data) {
  return this.afs.collection('answer').add(data);
}



// Read Answers
getAllAnswers(qid) {
  return this.afs.collection('answer', ref => ref.where('qid', '==', qid).orderBy("good", "desc")).snapshotChanges();
}

// Read
getAllQuestions(classId) {
  return this.afs.collection('discussion', ref => ref.where('classId', '==', classId)).snapshotChanges();
}


// Delete Question

deleteQuestion(id) {
  return this.afs.doc('discussion/' + id).delete();
}

//Vote up
voteUp(id, data) {
  return this.afs.doc('answer/' + id).set(data);
}


  /* CLASSES */

  getAllClasses(){
    return this.afs.collection<any>('classes').snapshotChanges();
  }
  // getStudentClasses(studentId){
  //   return this.afs.collection<any>('student-class', ref=> ref.where('studentId','==',studentId)).snapshotChanges();
  // }
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


  //CLASS READING MATERIAL AND NOTES//

  getNotes(classId){
    return this.afs.collection('readingmaterial', ref=>ref.where('classId','==',classId)).snapshotChanges();
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
