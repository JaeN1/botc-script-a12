import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private hasTownsfolkBeenSelected = new BehaviorSubject<boolean>(false);

  public hasTownsfolkBeenSelected$ = this.hasTownsfolkBeenSelected.asObservable();

  private townsfolkCharacters = new BehaviorSubject<any[]>([]);
  private outsiderCharacters = new BehaviorSubject<any[]>([]);
  private minionCharacters = new BehaviorSubject<any[]>([]);
  private demonCharacters = new BehaviorSubject<any[]>([]);


  private selectedCharacter = new BehaviorSubject<any>(null);
  selectedCharacter$ = this.selectedCharacter.asObservable();
  //Plural
  private selectedCharacters = new BehaviorSubject<any[]>([]);
  selectedCharacters$ = this.selectedCharacters.asObservable();
  //Ids
  private selectedCharacterIds = new BehaviorSubject<number[]>([]);
  selectedCharacterIds$ = this.selectedCharacterIds.asObservable();

  selectCharacter(character: any) {
    this.selectedCharacter.next(character);
  }

  // toggleCharacterSelection2(character: any) {
  //   const currentIndex = this.selectedCharacterIds.value.indexOf(character.id);
  //   const newSelectedCharacterIds = [...this.selectedCharacterIds.value];

  //   const currentCharacters = this.selectedCharacters.value;
  //   const index = currentCharacters.findIndex(c => c.id === character.id); // Asumiendo que cada personaje tiene un 'id' único

  //   if (index === -1) {
  //     // Si el personaje no está en la lista, agrégalo
  //     this.selectedCharacters.next([...currentCharacters, character]);
  //   } else {
  //     // Si el personaje ya está en la lista, elimínalo
  //     this.selectedCharacters.next(currentCharacters.filter(c => c.id !== character.id));
  //   }
  // }

  toggleCharacterSelection(character: any) {
    // Obtén los índices del personaje en ambas listas
    const indexInIds = this.selectedCharacterIds.value.indexOf(character.id);
    const indexInCharacters = this.selectedCharacters.value.findIndex(c => c.id === character.id);

    const currentSelected = this.selectedCharacters.value;
    const index = currentSelected.findIndex(c => c.id === character.id);
  
    if (character.roleType === 'townsfolk' && !this.hasTownsfolkBeenSelected.getValue()) {
      this.hasTownsfolkBeenSelected.next(true);
    }

    switch(character.roleType) {
      case 'townsfolk':
        this.updateCharacterSelection(this.townsfolkCharacters, character);
        break;
      case 'outsider':
        this.updateCharacterSelection(this.outsiderCharacters, character);
        break;
      case 'minion':
        this.updateCharacterSelection(this.minionCharacters, character);
        break;
      case 'demon':
        this.updateCharacterSelection(this.demonCharacters, character);
        break;
      // ... y así sucesivamente para cada categoría
    }

    // Copia las listas actuales para modificar
    const newSelectedCharacterIds = [...this.selectedCharacterIds.value];
    const newSelectedCharacters = [...this.selectedCharacters.value];
  
    if (indexInIds === -1) {
      // Si el personaje no está en la lista de IDs, agrégalo a ambas listas
      newSelectedCharacterIds.push(character.id);
      newSelectedCharacters.push(character);
    } else {
      // Si el personaje ya está en la lista de IDs, elimínalo de ambas listas
      newSelectedCharacterIds.splice(indexInIds, 1);
      newSelectedCharacters.splice(indexInCharacters, 1);
    }
  
    // Actualiza las listas en el BehaviorSubject
    this.selectedCharacterIds.next(newSelectedCharacterIds);
    this.selectedCharacters.next(newSelectedCharacters);
  }
  

  private updateCharacterSelection(subject: BehaviorSubject<any[]>, character: any) {
    let characters = subject.getValue();
    const index = characters.findIndex(c => c.id === character.id);
  
    if (index === -1) {
      console.log('Agregando personaje:', character);
      subject.next([...characters, character]);
    } else {
      console.log('Eliminando personaje:', character);
      subject.next(characters.filter(c => c.id !== character.id));
    }
  }


    // Método público para obtener el observable de townsfolkCharacters
    getTownsfolkCharacters(): Observable<any[]> {
      return this.townsfolkCharacters.asObservable();
    }
    // Método público para obtener el observable de OutsiderCharacter
    getOutsiderCharacters(): Observable<any[]> {
      return this.outsiderCharacters.asObservable();
    }
    // Método público para obtener el observable de MinionCharacters 
    getMinionCharacters(): Observable<any[]> {
      return this.minionCharacters.asObservable();
    }
    // Método público para obtener el observable de demonCharacters
    getDemonCharacters(): Observable<any[]> {
      return this.demonCharacters.asObservable();
    }
}
