import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Naipe } from '../../../models/naipe';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scoundrel',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './scoundrel.component.html',
  styleUrl: './scoundrel.component.css'
})
export class ScoundrelComponent implements OnInit {

  protected arma?: Naipe;
  protected healthPoints: number = 20;
  protected baraja!: Naipe[];
  protected router: Router = inject(Router);
  protected room: (Naipe | undefined)[] = [undefined, undefined, undefined, undefined];
  protected puedeHuir: boolean = true;
  protected puedeAvanzar: boolean = false;
  protected limitacionArma: number = 15;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.nuevaPartida();
  }

  huir() {
    if (this.puedeHuir) {
      this.puedeHuir = false;

      this.room.forEach(naipe => {
        if (naipe) this.baraja.unshift(naipe);
      });

      this.room = [undefined, undefined, undefined, undefined];
      this.nuevaHabitacion();
    }
  }

  avanzarHabitacion() {
    this.puedeHuir = true;
    this.nuevaHabitacion();
  }

  nuevaHabitacion() {
    this.room = this.room.map(naipe => naipe ?? Naipe.tomarCarta(this.baraja));
    this.puedeAvanzar = false;
  }

  useNaipe(index: number) {
    const carta = this.room[index];
    if (!carta) return;
    
    if (carta.palo === 'Diamantes') {
      this.arma = carta;
      this.limitacionArma = 15;
    } else if (carta.palo === 'Corazones') {
      this.takeDamage(-carta.valor);
    } else if (carta.palo === 'Picas' || carta.palo === 'Tréboles') {
      if (this.arma && this.limitacionArma > carta.valor) {
        //peleo con el arma
        if(carta.valor > this.arma.valor) {
          //toma daño por la diferencia
          this.takeDamage(carta.valor - this.arma.valor);
        }
        this.limitacionArma = carta.valor;
      } else {
        //peleo sin arma
        this.takeDamage(carta.valor);
      }
    }

    this.room[index] = undefined;
    
    // Forzar la actualización de la vista
    this.cdr.detectChanges();
    
    const cartasUsadas = this.room.filter(naipe => naipe === undefined).length;

    if(this.baraja.length === 0 && cartasUsadas == 4 && this.healthPoints > 0) {
      this.ganar();
      return;
    }

    if (cartasUsadas >= 3) {
      this.puedeAvanzar = true;
    }
  }

  nuevaPartida() {
    this.healthPoints = 20;
    this.room = [undefined, undefined, undefined, undefined];
    this.baraja = Naipe.barajarScoundrel();
    this.nuevaHabitacion();
    this.puedeHuir = true;
    this.puedeAvanzar = false;
    this.arma = undefined;
    this.limitacionArma = 15;
  }

  takeDamage(damage: number) {
    this.healthPoints -= damage;
    if (this.healthPoints <= 0) {
      this.terminarJuego();
    } else if (this.healthPoints > 20) {
      this.healthPoints = 20;
    }
  }

  obtenerImagenCarta(naipe?: Naipe): string {
    let numero = naipe?.numero;
    if (numero === 'As') {
      numero = 'A';
    }
    return `../../../assets/img/menor-mayor/${numero}${naipe?.palo.charAt(0)}.svg`;
  }

  terminarJuego() {
    Swal.fire({
      title: 'YOU ARE DEAD',
      text: '',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Volver a jugar',
      cancelButtonText: 'Volver al inicio',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.nuevaPartida();
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  ganar() {
    Swal.fire({
      title: 'GANASTE',
      text: 'Contra todo pronóstico, has sobrevivido.',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Volver a jugar',
      cancelButtonText: 'Volver al inicio',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.nuevaPartida();
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }
}
