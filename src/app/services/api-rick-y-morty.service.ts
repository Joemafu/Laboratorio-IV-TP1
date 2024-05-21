import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRickYMortyService {

  private apiUrl: string = 'https://rickandmortyapi.com/api/character';
  public cantidadDePersonajes?: number;

  private http : HttpClient = inject(HttpClient);

  constructor() {
  }

  async contarPersonajes(): Promise<number> {
    try {
      const data: any = await this.http.get(this.apiUrl).toPromise();
      return data.info.count;
    } catch (error) {
      console.error('Error al obtener el conteo de personajes:', error);
      return 0;
    }
  }

  async getCharacterById(id: number) {
    try {
      const data: any = await this.http.get(`${this.apiUrl}/${id}`).toPromise();
      return data;
    } catch (error) {
      console.error('Error al obtener el personaje:', error);
      return null;
    }
  }
}