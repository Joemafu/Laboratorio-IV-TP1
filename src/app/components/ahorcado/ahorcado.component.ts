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
  
  private palabras: string[] = [];
  protected palabraActual: string = '';
  protected letraAdivinada: Set<string> = new Set();
  protected vidasPerdidas: number = 0;
  protected vidasIniciales: number = 6;
  protected newLetter: string = '';

  constructor() {
    this.nuevaPartida();
  }

  nuevaPartida() {
    if (this.palabras.length === 0) {
      this.rellenarPalabras();
    }
    this.tomarPalabra();
    this.letraAdivinada.clear();
    this.vidasPerdidas = 0;
  }

  rellenarPalabras() {
    this.palabras = ['manzana', 'elefante', 'mariposa', 'montaña', 'tormenta',
    'familia', 'bicicleta', 'perro', 'escuela', 'pintura', 'galaxia', 'pelicula',
    'cancion', 'verano', 'playa', 'amigo', 'invierno', 'planeta', 'futbol', 
    'bosque', 'puente', 'coche', 'guitarra', 'reloj', 'espejo', 'panaderia',
    'cartera', 'medicina', 'tristeza', 'alegria', 'ventana', 'jardin', 'nieve',
    'ciudad', 'duende', 'retrato', 'dinosaurio', 'tigre', 'castillo', 'fuego',
    'diamante', 'mercado', 'cafe', 'biblioteca', 'pescado', 'gaviota', 'circo',
    'volcan', 'nube', 'maraton'];

    this.palabras = this.barajarArray(this.palabras);
  }

  tomarPalabra() {
    this.palabraActual = this.palabras.pop() as string;
  }

  barajarArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

  obtenerImagenAhorcado(): string {
    if (this.juegoTerminado()) {
      return this.palabraAdivinada() ? 'assets/img/ahorcado/ganaste.gif' : 'assets/img/ahorcado/perdiste.gif';
    }
    return `assets/img/ahorcado/a${this.vidasPerdidas}.png`;
  }
}
