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

  title: string="REGISTRARSE";
  alert: string = "";
  mail: string = "";
  pass: string ="";

  constructor (private authS: AuthService) {
  }

  buttonRegistrarse() {
    this.authS.register(this.mail, this.pass)
      .then(alert => {
        this.alert = alert;
        this.mail = "";
        this.pass = "";
      });
  }
  
}
