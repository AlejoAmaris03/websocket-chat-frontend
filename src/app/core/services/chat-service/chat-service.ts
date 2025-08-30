import { inject, Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { SweetAlertService } from '../sweet-alert/sweet-alert-service';
import { MessageModel } from '../../models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private brokerUrl: string = 'http://localhost:8080/ws';
  private stompClient!: CompatClient;
  private sweetAlert = inject(SweetAlertService);
  private messsageQueue: BehaviorSubject<MessageModel[]> = new BehaviorSubject<MessageModel[]>([]);

  private onConnected(username: string) {
    // Subscribe to the Topic 
    this.stompClient.subscribe('/topic/public', (message: any) => this.onMessageReceived(message.body)); 
  
    // Tell the username to the server  
    this.stompClient.send("/app/addUser", 
      {}, 
      JSON.stringify({sender: username, type: 'JOIN'})
    ); 
  }

  private onError() {
    this.sweetAlert.showSimpleMessage(
      'Error', 
      'Could not connect to WebSocket server. Please refresh this page to try again!',
      'error',
      'OK'
    );
  } 

  private onMessageReceived(message: any) {
    const msg = JSON.parse(message) as MessageModel;
    const messagesList = this.messsageQueue.getValue();
    
    messagesList.push(msg);
    this.messsageQueue.next(messagesList);
  }

  public connect(username: string) {
    const socket = new SockJS(this.brokerUrl);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect(
      {}, // Headers -> Authentication if needed
      () => this.onConnected(username), 
      () => this.onError()
    );
  }

  public sendMessage(message: MessageModel) {
    // Tell the message to the server 
    this.stompClient.send('/app/sendMessage', 
      {}, 
      JSON.stringify(message)
    );
  }

  public getMessageQueue(): Observable<MessageModel[]> {
    return this.messsageQueue.asObservable();
  }
}
