import { Component, OnDestroy, OnInit } from '@angular/core';
// import { RxStompService } from '../rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../websocket-service.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  receivedMessages: string[] = [];
  // @ts-ignore, to suppress warning related to being undefined
  private topicSubscription: Subscription;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    // this.topicSubscription = this.rxStompService
    //   .watch('/topic/demo')
    //   .subscribe((message: Message) => {
    //     this.receivedMessages.push(message.body);
    //   });

      this.webSocketService.connect();
      this.webSocketService.getMessages('/topic/demo').subscribe((message: string) => {
        this.receivedMessages.push(message);
      });
  }

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }

  onSendMessage() {
     const message = `Message generated at ${new Date()}`;
    // this.rxStompService.publish({ destination: '/topic/demo', body: message });
    this.webSocketService.sendMessage(   '/app/demo',  message );


  }
}
