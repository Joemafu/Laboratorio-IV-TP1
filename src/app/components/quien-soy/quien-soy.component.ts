import { Component } from '@angular/core';
@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})
export class QuienSoyComponent {

  edadJoel: number = 0;
  mesNacimiento = 6;
  diaNacimiento = 23;
  fechaActual = new Date();

  constructor() {}

  getEdad() {
    this.edadJoel = this.fechaActual.getFullYear() - 1992;
    
    if (
        this.fechaActual.getMonth() < this.mesNacimiento ||
        (this.fechaActual.getMonth() === this.mesNacimiento && this.fechaActual.getDate() < this.diaNacimiento)
    ) {
        this.edadJoel--;
    }
    return this.edadJoel;
  }
    
}
