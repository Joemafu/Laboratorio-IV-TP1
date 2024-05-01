import { Component, NgModule } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
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

  //esto funciona pero se llama siempre y el usuario se registra siempre
  constructor (private authS: AuthService) {
    /* authS.register('joe_mafu@hotmail.com', '123456'); */
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
    this.usuario="[Usuario]";
    this.pass="[Contraseña]";
  }

  buttonRegistrarse()
  {
    /* this.usuario=[Usuario];
    this.pass="[Contraseña]"; */
    /* console.log(this.usuario);
    console.log(this.pass); */
    try{
      this.authS.register(this.usuario, this.pass);
    }
    catch(e){
      console.log(e);
      console.log("Error en el registro");
    }
    
  }


  

}
