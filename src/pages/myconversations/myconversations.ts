import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";
import {map} from 'rxjs/operators'
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the MyconversationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myconversations',
  templateUrl: 'myconversations.html',
})
export class MyconversationsPage{

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  msgList = [];
  user:any;
  toUser: any;
  editorMsg = '';
  showEmojiPicker = false;
classId='';
  constructor(private navParams: NavParams,
              private chatService: ChatService,private api:ApiProvider,
              private events: Events,) {
    // Get the navParams toUserId parameter
    this.classId = this.navParams.data.id;
    console.log(this.navParams.data);
  
    this.toUser = {
      toUserId: this.classId, /* classID */
      toUserName:'CLASS'
    }
    // Get mock user information
    // this.chatService.getUserInfo()
    // .then((res) => {
    //   this.user = res
    // });
    this.api.getUser(localStorage.getItem('uid')).subscribe(res=>{
      this.user = res;
      console.log(this.user);
    })
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    //get message list
    this.getMsg();
    // Subscribe to received  new message events
    this.events.subscribe('chat:received', msg => {
      this.pushNewMsg(msg);
    })
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  convo;
  getMsg() {
    if(this.classId){
      this.api.getClassMessages(this.classId)
    .pipe(map(actions => actions.map(a =>{
      const data = a.payload.doc.data() ;
      const id = a.payload.doc.id;
      return {id, ...data};
}))).subscribe(resp=>{
  this.convo =resp;
  this.msgList = this.convo[0].messages;
  console.log(this.convo);
});

    }else{
      console.log(`no classId`)
    }
    
    // Get mock message list
    // return this.chatService
    // .getMsgList()
    // .subscribe(res => {
    //   this.msgList = res;
    //   this.scrollToBottom();
    // });
  }

  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    const id = Date.now().toString();
    // let newMsg: ChatMessage = {
    //   messageId: Date.now().toString(),
    //   userId: this.user.id,
    //   userName: this.user.name,
    //   userAvatar: this.user.photo,
    //   toUserId: this.toUser.id,
    //   time: Date.now(),
    //   message: this.editorMsg,
    //   status: 'pending'
    // };
    let newMsg={
      message: this.editorMsg,
      photo: this.user.photo,
      senderId: localStorage.getItem('uid'),
      senderName: this.user.name,
      status:'success',
      time: Date.now()
    }

    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.focus();
    }

    // this.chatService.sendMsg(newMsg)
    // .then(() => {
      let index = this.getMsgIndexById(id);
      this.api.sendMessage(this.classId, this.convo[0]).then(sentt=>{
        console.log(`message saved to db`)
      })
      if (index !== -1) {
        this.msgList[index].status = 'success';
      
      }
  //  })
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg) {
    const userId = this.user.uid,
      toUserId = this.toUser.id;
    // Verify user relationships
      this.msgList.push(msg);
      this.convo.messages = this.msgList;

    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea =this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }
}
