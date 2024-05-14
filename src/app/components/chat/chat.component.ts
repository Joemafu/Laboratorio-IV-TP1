import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../interfaces/message.interface';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ FormsModule, AsyncPipe ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {

  protected message: string = '';
  protected mensajes$: Observable<Message[]> = new Observable<Message[]>();
  private user: string = '';

  // Inyectamos el servicio (angular 17)
  private chatService = inject(ChatService);
  private authService = inject(AuthService);
  private chatSubscription: Subscription = new Subscription();
  private authSubscription: Subscription = new Subscription();

  // Inyectamos el servicio (angular 12)
  // constructor(private messageSrv: MessageService) { }

  constructor() { 
    this.authSubscription = this.authService.user$.subscribe((user) => {
      if (user) {
        
        this.user = user.email!;
      } else {
        this.user="";     
      }
    });/* 
    this.chatSubscription = this.chatService.messages$.subscribe((mensajes) => {
      if(mensajes) {

      }
      else {

      }
    }); */
  }

  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getMessages();
  }

  private getMessages() {
    this.mensajes$ = this.chatService.getAll();
  }

  protected sendMessage() {

    if(this.authService.currentUserSig() != null)
    {
      const obj: Message = {
        content: this.message,
        date: '',
        mail: this.user
      }

      this.chatService.agregarMensaje(obj).then(() => {
        console.log(obj.mail, 'dice:', obj.content);
        this.message = '';
      })
    }
  }
}
