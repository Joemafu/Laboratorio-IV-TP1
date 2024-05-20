import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sitio-en-construccion',
  standalone: true,
  imports: [],
  templateUrl: './sitio-en-construccion.component.html',
  styleUrl: './sitio-en-construccion.component.css'
})
export class SitioEnConstruccionComponent {

  router = inject(Router);

  botonInicio() {
    this.router.navigateByUrl('/home');
  }

}
