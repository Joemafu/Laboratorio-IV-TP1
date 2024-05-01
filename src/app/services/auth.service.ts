import { Injectable } from '@angular/core';
/* import { AngularFireAuth } from '@angular/fire/compat/auth'; */
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor (private authF: Auth, private router: Router) { }

  userCredentials: any = null;

  /* async register(mail: string, pass: string) {
    // Asincronismos. async y await
    // return this.authF.createUserWithEmailAndPassword(email, password)
    const respuesta = await this.authF.createUserWithEmailAndPassword(mail, pass);
    this.userCredentials = respuesta.user;
    console.log(this.userCredentials);
  } */
  register(email: string, password: string) 
  {
      createUserWithEmailAndPassword(this.authF, email, password).then(() => 
      {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/home']);
      }, 
      err => 
      {
        console.log(err.message);
        this.router.navigate(['/login']);
        console.log("Error en el registro");
      });
  }

  /* login(mail: string, pass: string) {
    // Asincronismo con .then
    // return this.authF.signInWithEmailAndPassword(mail, pass)
    this.authF.signInWithEmailAndPassword(mail, pass).then((credenciales) => {
      this.userCredentials = credenciales.user;
    });
    console.log(this.userCredentials);
  } */

  //login method
  login(email: string, password: string) {
    signInWithEmailAndPassword(this.authF, email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/home']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }

  logout() {
    // return this.authF.signOut() 
    /* this.authF.signOut().then(() => {
      this.userCredentials = null;
    }); */

    signOut(this.authF).then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }

  /*
  hasUser() {
    return this.authF.authState
  } */
}
