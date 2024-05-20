import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Naipe } from '../../../models/naipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit{
  protected ultimoNaipe?: Naipe;
  protected naipeNuevo?: Naipe;
  protected puntaje: number = 0;
  protected baraja!: Naipe[];
  protected router : Router = inject(Router);
  protected seleccion : string = '';

  ngOnInit(): void {
    this.nuevaPartida();
    
  }

  nuevaPartida() {
    this.puntaje = 0;
    this.baraja = Naipe.barajar();
    this.ultimoNaipe = Naipe.tomarCarta(this.baraja);
  }

  elegirMayor()
  {
    this.seleccion = 'mayor';
    this.naipeNuevo = Naipe.tomarCarta(this.baraja);

    if(Naipe.esMayorOIgual(this.ultimoNaipe!, this.naipeNuevo!))
    {
      this.puntaje++;
      this.ultimoNaipe = this.naipeNuevo;
    }
    else
    {
      this.terminarJuego();
    }
  }

  elegirMenor()
  {
    this.seleccion = 'menor';
    this.naipeNuevo = Naipe.tomarCarta(this.baraja);

    if(Naipe.esMenorOIgual(this.ultimoNaipe!, this.naipeNuevo!))
    {
      this.puntaje++;
      this.ultimoNaipe = this.naipeNuevo;
    }
    else
    {
      this.terminarJuego();
    }
  }

  terminarJuego()
  {
    Swal.fire({
      title: 'Perdiste',
      text: 'El último naipe fue '+this.ultimoNaipe?.numero + ' de ' + this.ultimoNaipe?.palo + ', seleccionaste '+ this.seleccion + ' pero salió '+ this.naipeNuevo?.numero + ' de ' + this.naipeNuevo?.palo + '. - Tu puntaje fue de ' + this.puntaje,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Volver a jugar',
      cancelButtonText: 'Ir a Home',
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
