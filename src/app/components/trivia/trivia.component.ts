import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRickYMortyService } from '../../services/api-rick-y-morty.service';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css'
})

export class TriviaComponent implements OnInit {

  cantidadDePersonajes: number = 0;
  characterImage: string = '';
  correctAnswer: string = '';
  options: string[] = [];
  randomId: number = 0;
  userAnswer: string = '';
  errorMessage: string = '';
  racha : number = 0;
  resultado : string = '';

  apiRYMService: ApiRickYMortyService = inject(ApiRickYMortyService);

  constructor() { };
  
  async ngOnInit() {
    this.cantidadDePersonajes = await this.apiRYMService.contarPersonajes();
    this.nuevaPartida();
  }

  nuevoPersonaje() {
    this.randomId = this.getRandomNumber(1, this.cantidadDePersonajes);
    this.loadCharacter(this.randomId);
  } 

  nuevaPartida(): void {
    this.racha = 0;
    this.resultado = '';
    this.nuevoPersonaje();
  }

  getRandomNumber(min: number, max: number): number {
    let ret = Math.floor(Math.random() * (max - min + 1)) + min;
    return ret;
  }

  loadCharacter(id: number): void {
    this.apiRYMService.getCharacterById(id).then(data => {
      this.characterImage = data.image;
      this.correctAnswer = data.name;
      this.loadOptions(id);
    }).catch(error => {
      this.errorMessage = 'Error al cargar el personaje. Inténtalo de nuevo.';
      console.error(error);
    });
  }

  async loadOptions(correctId: number): Promise<void> {
    const optionsSet = new Set<string>();
    optionsSet.add(this.correctAnswer);
    let cont = 0;
  
    while (optionsSet.size < 4 && cont < 13) {
      cont++;
      
      const randomId = this.getRandomNumber(1, this.cantidadDePersonajes);
      if (randomId !== correctId) {
        try {
          let data: any = await this.apiRYMService.getCharacterById(randomId);
          optionsSet.add(data.name);
          if (optionsSet.size === 4) {
            this.options = this.shuffleArray(Array.from(optionsSet));
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  checkAnswer(answer: string): void {

    this.userAnswer = answer;
    if (answer === this.correctAnswer) {
      this.racha++;
      this.resultado = 'Correcto!';   
      this.nuevoPersonaje();   
    } else {
      let button : HTMLButtonElement;
      for (let i = 0; i < 4; i++) {
        button = document.getElementById(i.toString()) as HTMLButtonElement;
        button.disabled = true;
      }
      this.resultado = 'Incorrecto! Tu racha fue de ' + this.racha + ' aciertos!';     
    }
  }
}