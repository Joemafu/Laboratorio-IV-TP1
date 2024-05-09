import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor() {}

  router = inject(Router);

  buttonAhorcado() {
    // this.router.navigateByUrl('/ahorcado');
    this.router.navigateByUrl('/sitio-en-construccion');
  }
  buttonMayorMenor() {  
    // this.router.navigateByUrl('/mayor-menor');
    this.router.navigateByUrl('/sitio-en-construccion');
  }
  buttonPreguntados() {
    // this.router.navigateByUrl('/preguntados');
    this.router.navigateByUrl('/sitio-en-construccion');
  }
  buttonJuegoPropio() {
    this.router.navigateByUrl('/sitio-en-construccion');
  }
}