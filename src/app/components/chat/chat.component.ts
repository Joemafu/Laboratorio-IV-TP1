import { ElementRef, Component, OnInit, OnDestroy, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../interfaces/message.interface';
import { Subscription } from 'rxjs';
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
  private chatService = inject(ChatService);
  private authService = inject(AuthService);
  private chatSubscription: Subscription = new Subscription();
  private authSubscription: Subscription = new Subscription();
  @ViewChild('chatBox') chatBox!: ElementRef;

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
        this.scrollDown();
      }
      else {
        this.messages = [];
      }
    });
  }

  scrollDown() {
    setTimeout(() => {
      if (this.chatBox) {
        this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
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
          this.message = '';
        })
      }
      else
      {
        this.router.navigateByUrl('/login');
      }
    }    
  }

  esMensajeUsuarioActual(mensaje: Message): boolean {
    return mensaje.mail === this.user;
  }

  formatearHora(timestamp: any): string {

    const date = timestamp.toDate();

    // Obtener día y mes
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getYear();

    // Formatear día y mes con ceros a la izquierda si es necesario
    const formattedDay = ('0' + day).slice(-2);
    const formattedMonth = ('0' + month).slice(-2);
    const formattedYear = ('0' + year).slice(-2);

    // Obtener hora y minutos
    const hour = date.getHours();
    const minutes = date.getMinutes();

    // Formatear hora y minutos con ceros a la izquierda si es necesario
    const formattedHour = ('0' + hour).slice(-2);
    const formattedMinutes = ('0' + minutes).slice(-2);

    // Crear cadena con el formato deseado (dd/MM - HH:mm)
    const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear} - ${formattedHour}:${formattedMinutes}`;

    return formattedDate;
  }

}