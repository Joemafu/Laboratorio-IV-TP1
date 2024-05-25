import { Component, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Maletin } from '../../../models/maletin';


@Component({
  selector: 'app-trato-hecho',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './trato-hecho.component.html',
  styleUrl: './trato-hecho.component.css'
})
export class TratoHechoComponent {

  @ViewChildren('montoLabel') montoLabels: QueryList<ElementRef> = new QueryList<ElementRef>();

  protected maletines: Maletin[] = [];
  protected maletinesAbiertos : number[] = [];
  protected maletinElegido : number = 0;
  protected montosBajos : number[] = [0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750];
  protected montosAltos : number[] = [1000, 5000, 10000, 25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000];
  protected oferta : number = 0;
  protected juegoPausado : boolean = false;
  protected mensajeInstruccion : string = "Elige tu maletín!";
  protected maletinesPorRonda : number = 7;
  protected numeroRonda : number = 1;
  protected ofertasPasadas : string[] = [];
  protected juegoTerminado : boolean = false;
  protected mensajeFinDeJuegoUno : string = "";
  protected mensajeFinDeJuegoDos : string = "";

  constructor() {
    this.nuevaPartida();
  }

  nuevaPartida()
  {    
    this.maletines = Maletin.generarMaletines();
    this.maletinesAbiertos = [];
    this.maletinElegido = 0;
    this.oferta = 0;
    this.juegoPausado = false;
    this.mensajeInstruccion = "Elige tu maletín!";
    this.maletinesPorRonda = 7;
    this.numeroRonda = 1;
    this.ofertasPasadas = [];
    this.juegoTerminado = false;
    this.mensajeFinDeJuegoUno = "";
    this.mensajeFinDeJuegoDos = "";
  }

  develar(nroMaletin: number, boton: HTMLButtonElement)
  {
    if (this.juegoPausado || this.maletinesAbiertos.includes(nroMaletin) || this.maletinElegido === nroMaletin) {
      return false;
    }

    if(this.maletinElegido === 0)
    {
      boton.className = "miMaletin";
      this.maletinElegido = nroMaletin;
      
      this.actualizarInstruccion(); 
    }
    else
    {
      this.cambiarClasePorContenido('$'+this.traerMontoPorNumero(nroMaletin).toString());
      this.maletinesAbiertos.push(nroMaletin);
      this.eliminarMaletinPorNumero(nroMaletin);
      this.maletinesPorRonda--;

      if (this.maletinesPorRonda == 0)
      {
        this.juegoPausado = true;
        this.calcularOferta();
      }
      else
      {
        this.actualizarInstruccion(); 
      }
    }
    return true;
  }

  eliminarMaletinPorNumero(numero: number) {
    const index = this.maletines.findIndex(maletin => maletin.numero === numero);
    if (index > -1) {
      this.maletines.splice(index, 1);
    }
  }

  traerMontoPorNumero(numero: number) : number{
    let index = this.maletines.findIndex(maletin => maletin.numero === numero);
    return this.maletines[index].valor;
  }

  cambiarClasePorContenido(contenido: string) {
    let nuevaClase = 'disabled';
    this.montoLabels.forEach((label: ElementRef) => {
      if (label.nativeElement.textContent.trim() === contenido) {
        label.nativeElement.className = nuevaClase;
      }
    });
  }

  actualizarInstruccion()
  {
    if(this.maletinElegido !== 0)
    {
      this.mensajeInstruccion = "Abre " + this.maletinesPorRonda + " maletines para recibir tu próxima oferta!";
    }    
  }

  calcularOferta() {

    let acumulador = 0;
    this.maletines.forEach(element => {
      acumulador += element.valor;      
    });
    let promedio = acumulador / this.maletines.length;

    switch (this.numeroRonda) {
      case 1:
        this.oferta = promedio * 0.26;
        this.maletinesPorRonda = 6;
        break;
      case 2:
        this.oferta = promedio * 0.55;
        this.maletinesPorRonda = 4;
        break;
      case 3: 
        this.oferta = promedio * 0.65;
        this.maletinesPorRonda = 3;
        break;
      case 4:
        this.oferta = promedio * 0.76;
        this.maletinesPorRonda = 2;
        break;
      case 5:
        this.oferta = promedio * 0.84;
        this.maletinesPorRonda = 1;
        break;
      case 6:
        this.oferta = promedio * 0.88;
        this.maletinesPorRonda = 1;
        break;
      case 7:
        this.oferta = promedio * 0.92;
        this.maletinesPorRonda = 1;
        break;
    }
    let oferta = this.formatearDinero(this.oferta);
    this.mensajeInstruccion = `El banco te ofrece $${oferta}. ¿Aceptas?`;
  }

  formatearDinero(numero: number): string {
    
    let numeroFormateado: string = numero.toFixed(2);

    let partes: string[] = numeroFormateado.split('.');

    if (partes.length === 1) {
        numeroFormateado += ',00';
    } else if (partes[1].length === 1) {
        numeroFormateado += '0';
    }

    let parteEntera: string[] = partes[0].split('');

    for (let i: number = parteEntera.length - 3; i > 0; i -= 3) {
        parteEntera.splice(i, 0, '.');
    }

    numeroFormateado = parteEntera.join('');

    if (partes.length > 1) {
        numeroFormateado += ',' + partes[1];
    }

    return numeroFormateado;
  }

  castear(stringNumero : string) : number
  {
    return Number(stringNumero);
  }

  aceptarOferta() {
    let oferta = this.formatearDinero(this.oferta);
    this.mensajeFinDeJuegoUno=`Aceptaste la oferta de $${oferta}!`;
    this.mensajeFinDeJuegoDos = `Renunciaste a tu maletín que contenía $${this.maletines.find(maletin => maletin.numero === this.maletinElegido)?.valor}!`;
    this.juegoTerminado = true;
  }

  rechazarOferta() {
    if (this.maletinesAbiertos.length === 24) {
      this.mensajeFinDeJuegoUno=`Te quedaste con tu maletin hasta el final!`;
      this.mensajeFinDeJuegoDos = `Tu maletín contiene $${this.maletines.find(maletin => maletin.numero === this.maletinElegido)?.valor} y son todos tuyos!`
      this.juegoTerminado = true;
    }
    else
    {
      this.numeroRonda++;
      this.ofertasPasadas.push(this.formatearDinero(this.oferta));
      this.juegoPausado = false;
      this.actualizarInstruccion();
    }
  }
}
