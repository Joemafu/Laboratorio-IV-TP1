import { Injectable, inject, signal } from '@angular/core';
import { Message } from '../interfaces/message.interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Firestore, CollectionReference, addDoc, collection, collectionData, query, orderBy, serverTimestamp, limit, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private PATH = 'mensajes';
  public messages$!: Observable<Message[]>;
  public messages = signal<Message[] | null | undefined>(undefined);
  private db = inject(Firestore); 

  constructor() {
    let mensajes = collection(this.db, this.PATH);
    const consulta = query(mensajes, orderBy('fecha', 'asc'));
    this.messages$ = collectionData(consulta) as Observable<Message[]>;   
  }

  public getAll() {
    return this.messages$;
  }

  public async agregarMensaje(message: Message) {
    try{
      let mensajes = collection(this.db, this.PATH);
      addDoc(mensajes, { content: message.content, date: serverTimestamp(), mail: message.mail});
    }catch(error){
      console.error('No se pudo enviar el mensaje. ', error);
    }
  }
}


































/* import { Injectable, inject } from '@angular/core';
import { Message } from '../interfaces/message.interface';
// Asi era para RealTime Database
// import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
 import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, CollectionReference, addDoc, collection, collectionData, query, orderBy, limit, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private PATH = 'messages';
  private items$: Observable<Message[]>;
  private db = inject(AngularFirestore);



  constructor() {

    this.items$ = this.db.collection<Message>(this.PATH).valueChanges() as Observable<Message[]>;

    // Asi era para RealTime Database
    // this.items$ = this.db.list(this.PATH).valueChanges() as Observable<Message[]>;
  }

  public getAll() {
    return this.items$;
  }

  public async agregarMensaje(message: Message) {

    message.code = this.db.createId().substring(0, 10);

    // Asi era para RealTime Database
    // message.code = this.db.createPushId().substring(0, 10);

    const path = `${this.PATH}/${message.code}`;


    return this.db.collection(path).add(message);
    
    // Asi era para RealTime Database
    // return this.db.object(path).set(message);
  }

} */