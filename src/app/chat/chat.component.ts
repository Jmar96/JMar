import { Component, OnInit } from '@angular/core';

import { ChatService }from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  ChatList:any = [];
  DateTimeToIDNo: string="";
  NewChat: string="";
  p: number = 1;
  total: number = 0;
  
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.listChats();
  }

  //list
  listChats(){
    this.chatService.list(this.p).subscribe((response: any)=>{
      this.ChatList = response;
      this.total = response.total;
    },(error=>{
      console.log(error);
    }));
  }
  //pagination
  pageChangeEvent(event: number){
    this.p = event;
    this.listChats();
  }
  //create
  newChat(){
    let todo = {
      id: new Date().getTime(), //from datetime to number
      UserID: 1,
      Msg: this.NewChat,
      DateTime: new Date()
    }
    if(todo.Msg.length > 1){
      this.chatService.saveChat(todo).subscribe((response)=>{
        this.listChats();
      },(error=>{
  
      }))
    }else{
    }
  }
}
