import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title: string = 'Sala de Juegos';
  authService: AuthService = inject(AuthService);
  componenteActivo: string = '';
  usuario: string = '';
  logeado: boolean = false;
  constructor (private authS: AuthService) {}



  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          mail: user.email!,
          pass: "",
        });
        console.log('Usuario logueado: ', user.email);
        this.usuario = user.email!;
        this.logeado = true;
      } else {
        this.usuario="";
        this.logeado = false;
        this.authService.currentUserSig.set(null);
        console.log('No hay usuario logueado');        
      }
    });
  }

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

  buttonLogOut() {    
    this.authS.logout();
    this.buttonLogIn();
  }

}
