import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Sala de Juegos';

  test= 'texto prueba';

  // Para navegar por TypeScript
  private router = inject(Router);
  buttonQuienSoy() {
    this.test="Sobre mí";
    this.router.navigateByUrl('/quien-soy');
  } 

  buttonHome() {
    this.test="Home";
  }

  buttonLogIn() {
    this.test="Login";
  }

}
