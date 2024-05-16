import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, OnDestroy {
  title: string = 'Sala de Juegos';
  authService: AuthService = inject(AuthService);
  componenteActivo: string = '';
  usuario: string = '';
  public subscription: Subscription = new Subscription();
  private router = inject(Router);

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          mail: user.email!,
          pass: "",
        });
        this.usuario = user.email!;
      } else {
        this.usuario="";
        this.authService.currentUserSig.set(null);    
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  buttonQuienSoy() {
    this.componenteActivo="Sobre mí";
    this.router.navigateByUrl('/quien-soy');
  } 

  buttonHome() {
    this.componenteActivo="Home";
    this.router.navigateByUrl('/home');
  }

  buttonLogIn() {
    this.componenteActivo="Login";
    this.router.navigateByUrl('/login');
  }

  buttonRegistrar() {
    this.componenteActivo="Register";
    this.router.navigateByUrl('/registrar');
  }

  buttonLogOut() {    
    this.authService.logout();
    this.buttonLogIn();
  }
}
