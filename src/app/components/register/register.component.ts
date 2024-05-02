import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService,   } from '../../services/auth.service'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  mail: string = "";
  pass: string ="";
  title: string="REGISTRARSE";
  alert: string = "";

  constructor (private authS: AuthService) {
  }

  buttonRegistrarse() {
    this.authS.register(this.mail, this.pass)
      .then(alert => {
        this.alert = alert; // El mensaje de error se asigna al alert para mostrarlo en el HTML
        this.mail = "";
        this.pass = "";
      });
  }
  
}
