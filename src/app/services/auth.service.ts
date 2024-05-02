import { Injectable, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user, User} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/interface.user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static currentUserMail: any = null;
  constructor (private firebaseAuth: Auth, private router: Router) { 
    /* this.user$ = new Observable((observer) => {
      this.firebaseAuth.onAuthStateChanged((user) => {
        observer.next(user);
      });
    }); */
  }

  //user$ = user(this.firebaseAuth);
  currentUserSig = signal< UserInterface | null | undefined>(undefined);

  
  //user$ = this.firebaseAuth.onAuthStateChanged.bind(this.firebaseAuth);

  register(email: string, password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user)
          {
            AuthService.currentUserMail = user.email;
            localStorage.setItem('token', 'true');
            this.router.navigate(['/home']);
            console.log(AuthService.currentUserMail);
            resolve('');
          } 
        else
          {
            console.log('Acá hay un problemita. No se pudo obtener el usuario');
          }     
        })
        .catch(err => {
          let mensajeError = '';
          switch (err.message) {
            case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
              mensajeError = 'La contraseña debe tener al menos 6 caracteres';
              break;
            case 'Firebase: Error (auth/invalid-email).':
              mensajeError = 'Ingrese un correo válido.';
              break;
            case 'Firebase: Error (auth/email-already-in-use).':
              mensajeError = 'El correo indicado ya se encuentra registrado.';
              break;
            case 'Firebase: Error (auth/missing-password).':
              mensajeError = 'Ingrese una contraseña.';
              break;
            default:
              mensajeError = 'Error al registrar usuario.';
              break;
          }
          resolve(mensajeError);
        });
    });
  }
  
  login(email: string, password: string) : Promise <string> {
    return new Promise<string>((resolve, reject) => {
      signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user)
          {
            AuthService.currentUserMail = user.email;
            localStorage.setItem('token', 'true');
            this.router.navigate(['/home']);
            console.log(AuthService.currentUserMail);
            resolve('');
          } 
          else
          {
            console.log('Acá hay un problemita. No se pudo obtener el usuario');
          }       
      })
      .catch( err => {
        let mensajeError = '';
        switch (err.message) {
          case 'Firebase: Error (auth/invalid-credential).':
            mensajeError = 'Credenciales inválidas.';
            break;
          case 'Firebase: Error (auth/invalid-email).':
            mensajeError = 'Ingrese un correo válido.';
            break;
          case 'Firebase: Error (auth/missing-password).':
            mensajeError = 'Ingrese una contraseña.';
            break;
          default:
            mensajeError = 'Error al iniciar sesión.';
            break;
        }
        resolve(mensajeError);
      });
    });
  }

  logout() {
    // return this.firebaseAuth.signOut() 
    /* this.firebaseAuth.signOut().then(() => {
      this.userCredentials = null;
    }); */

    signOut(this.firebaseAuth).then(() => {
      AuthService.currentUserMail = null;
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
}
