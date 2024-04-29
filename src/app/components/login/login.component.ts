import { Component, NgModule } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';



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

  buttonDemoUno()
  {
    this.usuario="Admin@correo.com";
    this.pass="admin123";
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

}
