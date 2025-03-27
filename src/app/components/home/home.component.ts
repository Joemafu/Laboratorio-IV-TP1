import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ChatComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor() {}

  router = inject(Router);

  buttonAhorcado() {
    this.router.navigateByUrl('/ahorcado');
  }
  buttonMayorMenor() {  
    this.router.navigateByUrl('/mayor-menor');
  }
  buttonTrivia() {
    this.router.navigateByUrl('/trivia');
  }
  buttonJuegoPropio() {
    this.router.navigateByUrl('/trato-hecho');
  }
  buttonScoundrel() {
    this.router.navigateByUrl('/scoundrel');
  }
}