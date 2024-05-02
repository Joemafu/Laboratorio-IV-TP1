import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Sala de Juegos';

  componenteActivo= '';

  // Para navegar por TypeScript
  private router = inject(Router);
  // Navego con typescript
  buttonQuienSoy() {
    this.componenteActivo="Sobre mí";
    this.router.navigateByUrl('/quien-soy');
  } 

  buttonHome() {
    this.componenteActivo="Home";
  }

  buttonLogIn() {
    this.componenteActivo="Login";
  }

  buttonRegistrar() {
    this.componenteActivo="Registrar";
  }

}
