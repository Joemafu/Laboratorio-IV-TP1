import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  
  private palabras: string[] = [
    'manzana', 'elefante', 'mariposa', 'montaña', 'tormenta', 'familia', 'bicicleta',
    'perro', 'escuela', 'pintura', 'galaxia', 'pelicula', 'cancion', 'verano',
    'playa', 'amigo', 'invierno', 'planeta', 'futbol', 'bosque', 'puente', 'coche',
    'guitarra', 'reloj', 'espejo', 'panaderia', 'cartera', 'medicina', 'tristeza',
    'alegria', 'ventana', 'jardin', 'nieve', 'ciudad', 'duende', 'retrato', 'montaña',
    'tigre', 'castillo', 'fuego', 'diamante', 'mercado', 'cafe', 'biblioteca',
    'pescado', 'gaviota', 'circo', 'volcan', 'nube', 'maraton'
  ];
  protected palabraActual: string = '';
  protected letraAdivinada: Set<string> = new Set();
  protected vidasPerdidas: number = 0;
  protected vidasIniciales: number = 6;
  protected newLetter: string = '';

  constructor() {
    this.startNewGame();
  }

  startNewGame() {
    this.palabraActual = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.letraAdivinada.clear();
    this.vidasPerdidas = 0;
  }

  obtenerPalabra() {
    return this.palabraActual.split('').map(letra => this.letraAdivinada.has(letra) ? letra : '_').join(' ');
  }

  adivinar(letra: string): boolean {
    if (this.letraAdivinada.has(letra) || this.juegoTerminado()) {
      return false;
    }
    this.letraAdivinada.add(letra);

    if (!this.palabraActual.includes(letra)) {
      this.vidasPerdidas++;
    }

    return true;
  }

  juegoTerminado(): boolean {
    return this.vidasPerdidas >= this.vidasIniciales || this.palabraAdivinada();
  }

  palabraAdivinada(): boolean {
    return this.palabraActual.split('').every(letra => this.letraAdivinada.has(letra));
  }

  getImagenAhorcado(): string {
    if (this.juegoTerminado()) {
      return this.palabraAdivinada() ? 'assets/img/ahorcado/ganaste.gif' : 'assets/img/ahorcado/perdiste.gif';
    }
    return `assets/img/ahorcado/a${this.vidasPerdidas}.png`;
  }
}
