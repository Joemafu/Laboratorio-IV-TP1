import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  messages: Array<string> = [];
  message: string = '';

  sendMessage() {
    console.log('Enviando mensaje...');
  }

}
