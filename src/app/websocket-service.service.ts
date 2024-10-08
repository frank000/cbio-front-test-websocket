// src/app/services/websocket.service.ts
import { Injectable } from '@angular/core';
import { Client, Message, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client;
  private messageSubject = new Subject<string>();

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws', // URL do WebSocket
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => new SockJS('http://localhost:8080/ws') // Use SockJS caso seja necessário
    });

 

    this.client.onStompError = (frame) => {
      console.error('Erro STOMP: ' + frame.headers['message']);
      console.error('Detalhes: ' + frame.body);
    };
    
  }

  connect() {
    this.client.activate();
  }

  disconnect() {
    this.client.deactivate();
  }

  sendMessage(destination: string, body: any) {
    this.client.publish({ destination, body: JSON.stringify(body) });
  }

  getMessages( caminho : string) {
    this.client.onConnect = (frame) => {
        console.log('Conectado: ' + frame);
        this.client.subscribe(caminho, (message: Message) => {
          if (message.body) {
            this.messageSubject.next(message.body);
          }
        });
      };
    return this.messageSubject.asObservable();
  }
}