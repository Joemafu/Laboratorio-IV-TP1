import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService,   } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario: string = "";
  pass: string ="";
  title: string="INICIAR SESIÓN";
  alert: string = "";

  constructor (private authS: AuthService) {
  }

  buttonDemoUno()
  {
    this.usuario="Admin@correo.com";
    this.pass="administrador123";
  }

  buttonDemoDos()
  {
    this.usuario="Bruma@correo.com";
    this.pass="bruma123";
  }

  buttonDemoTres()
  {
    this.usuario="Joel@correo.com";
    this.pass="joel123";
  }

  buttonEntrar()
  {
    this.authS.login(this.usuario, this.pass)
    .then(alert => {
      this.alert = alert; // El mensaje de error se asigna al alert para mostrarlo en el HTML
      this.usuario = "";
      this.pass = "";
    });
  }
}
