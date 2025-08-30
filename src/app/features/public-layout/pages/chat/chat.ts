import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatModel, MessageModel } from '../../../../core/models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../../../../core/services';
import { MessageCard, UserStatusNotification } from "../../components";

@Component({
  selector: 'app-chat',
  imports: [
    ReactiveFormsModule,
    UserStatusNotification,
    MessageCard
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})

export default class Chat implements OnInit {
  protected form!: FormGroup;
  protected messagesQueue: ChatModel[] = [];
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private chatService = inject(ChatService);
  protected username: string | null = this.route.snapshot.queryParamMap.get('username');
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.form = this.fb.group({
      message: ['']
    });
  
    if(this.username) {
      this.chatService.connect(this.username);
      this.getMessages();
    }
    else
      if(typeof window !== 'undefined') window.location.href = '/';
  }

  protected sendMessage() {
    const messageContent = this.form.get('message')?.value;

    if(!messageContent)
      return;

    this.form.reset();

    const message: MessageModel = {
      sender: this.username!,
      message: messageContent,
      type: 'CHAT'
    }

    this.chatService.sendMessage(message);
    this.getMessages();
  }

  protected getMessages() {
    this.chatService.getMessageQueue().subscribe(msg => {
      this.messagesQueue = msg.map(m => ({ 
        chat: { ...m },
        messagePosition: m.sender === this.username ? 'right' : 'left'
      }));

      this.cdr.detectChanges();
    });
  }
}
