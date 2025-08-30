import { Component, Input } from '@angular/core';
import { ChatModel } from '../../../../core/models';

@Component({
  selector: 'app-message-card',
  imports: [],
  templateUrl: './message-card.html',
  styleUrl: './message-card.css'
})

export class MessageCard {
  @Input() message!: ChatModel;
}
