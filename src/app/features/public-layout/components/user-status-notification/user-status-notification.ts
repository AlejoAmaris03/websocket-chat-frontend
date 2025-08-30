import { Component, Input } from '@angular/core';
import { ChatModel } from '../../../../core/models';

@Component({
  selector: 'app-user-status-notification',
  imports: [],
  templateUrl: './user-status-notification.html',
  styleUrl: './user-status-notification.css'
})

export class UserStatusNotification {
  @Input() message!: ChatModel;
  protected userStatus = { JOIN: 'joined', LEAVE: 'left', CHAT: 'sent a message' }
}
