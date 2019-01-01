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
        firebase.    firestore.FieldValue.arrayUnion(localStorage.getItem('uid'))
  
      // students : this.studentId
    }
    );
  }

  
  getStudentClasses(studentId) {
    
      console.log(studentId);
    return this.afs.collection('classes', ref => ref.where('students', 'array-contains', studentId)).snapshotChanges();
    
    
   }
   getalerts(studentId){
    return this.afs.doc('students/' + studentId).valueChanges();
   }
   setSeen(studentId,val){
    return this.afs.doc('students/' + studentId).update({
      'seen':firebase.firestore.FieldValue.arrayUnion(val)
   }
    );
   }
   removeLatest(studentId,val){
    return this.afs.doc('students/' + studentId).update({
      'alerts':firebase.firestore.FieldValue.arrayRemove(val)
   }
    );
   }
   
   getStudentClass(classId) {
     if(classId!=null){
     return this.afs.doc('classes/' + classId).valueChanges();
     }
     else{
       console.log("not available");
     }
   }
   

   ///Reset Password
   resetPassword(email: string) {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => alert(" reset email sent"))
      .catch((error) => console.log(error));
  }

  /* USER */
  getStudentProfile(id) {
    return this.afs.doc('students/' + id).valueChanges();

  }
  getTeacherProfile(id) {
    return this.afs.doc('teachers/' + id).valueChanges();

  }
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


//Private Mesagges

//Send Message
sendText(data,message){
  return this.afs.collection('sent').doc(this.studentId.concat(data.teacherId)).set({data,
    'sent':
      firebase.    firestore.FieldValue.arrayUnion(message)


    // students : this.studentId
  },
  {merge:true}
  );
}
// sendReply(data,message){
//   return this.afs.collection('sent').doc(data.studentId.concat(this.adminId)).set({data,
//     'reply':
//     firebase.firestore.FieldValue.arrayUnion(message)
//   },{merge:true});
// }

//Recieve message
getMessages(studentId,classId) {
  return this.afs.collection('sent', ref => ref.orderBy('startTime').where('senderId', '==', studentId).where('classId','==',classId)).snapshotChanges();
}
// getMyMessages(studentId,teacherId):any{

//   let response:any = []; 
//   this.afs.collection('sent').doc(studentId.concat(teacherId)).snapshotChanges().subscribe(function(snapshot){
//     response.push(snapshot.payload.get("sent"));
//     // response=snapshot.payload.get("sent");
//     //response = snapshot.payload.get("sent");
//     console.log(snapshot.payload.get("sent"));
//   });
//   return response;
// }

getMyMessages(studentId,teacherId):any{
 
  return this.afs.collection('sent').doc(studentId.concat(teacherId)).valueChanges();
  
}

getTeacherMessage(teacherId){
  return this.afs.collection('sent', ref => ref.where('data.teacherId', '==', teacherId)).valueChanges();
}

sendMsg(tid){
  return this.afs.collection('sent').doc(localStorage.getItem('uid').concat(tid)).set({
    'sent':
      firebase.    firestore.FieldValue.arrayUnion("START TEST")
      


    // students : this.studentId
  },
  {merge:true}
  );
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

  ///QUIZZES NEW CODE BY ALE
  getAllQuizes() {
    return this.afs.collection('quizes').snapshotChanges();
  }
  getQuizes(classId) {
    return this.afs.collection('quizes', ref => ref.where('classId', '==', classId)).snapshotChanges();
  }
  // ~ READ Single
  getQuiz(id) {
    return this.afs.doc('quizes/' + id).valueChanges();
  }

  /* QUIZES */
  getClassQuizes(classId){
    return this.afs.collection<any>('quizes', ref=>ref.where('classId','==',classId)).snapshotChanges();
  }

submitQuiz(data){
  return this.afs.collection('studentquizes').add(data);
}
assignMarks(val,marks){
  console.log(val)
  return this.afs.collection('students/').doc(this.studentId).update({
    val:marks+marks
  });
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
