import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../interfaces/message.interface';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ FormsModule, AsyncPipe ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {

  protected messages: Message[] = [];
  protected message: string = '';
  private user: string = '';
  private router = inject(Router);

  // Inyectamos el servicio (angular 17)
  private chatService = inject(ChatService);
  private authService = inject(AuthService);
  private chatSubscription: Subscription = new Subscription();
  private authSubscription: Subscription = new Subscription();

  // Inyectamos el servicio (angular 12)
  // constructor(private messageSrv: MessageService) { }

  ngOnInit() { 
    this.authSubscription = this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user.email!;
      } else {
        this.user="";     
      }
    });
    this.chatSubscription = this.chatService.messages$.subscribe((mensajes) => {
      if(mensajes) {
        this.messages = mensajes;
      }
      else {
        this.messages = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  private getMessages() {

  }

  protected sendMessage() {
    if (this.message != '') {
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
      else
      {
        this.router.navigateByUrl('/login');
      }
    }    
  }
}
