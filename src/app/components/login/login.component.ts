import { Component, inject } from '@angular/core';
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

  mail: string = "";
  pass: string ="";
  title: string="INICIAR SESIÓN";
  alert: string = "";

  authS = inject(AuthService);

  // Forma vieja de inyectar el servicio
  /* constructor (private authS: AuthService) {
  } */

  buttonDemoUno()
  {
    this.mail="Admin@correo.com";
    this.pass="administrador123";
  }

  buttonDemoDos()
  {
    this.mail="Bruma@correo.com";
    this.pass="bruma123";
  }

  buttonDemoTres()
  {
    this.mail="Joel@correo.com";
    this.pass="joel123";
  }

  buttonEntrar()
  {
    this.authS.login(this.mail, this.pass)
    .then(alert => {
      this.alert = alert;
      this.mail = "";
      this.pass = "";
    });
  }
}
