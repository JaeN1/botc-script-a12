import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
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

  toggleCharacterSelection2(character: any) {
    const currentIndex = this.selectedCharacterIds.value.indexOf(character.id);
    const newSelectedCharacterIds = [...this.selectedCharacterIds.value];

    const currentCharacters = this.selectedCharacters.value;
    const index = currentCharacters.findIndex(c => c.id === character.id); // Asumiendo que cada personaje tiene un 'id' único

    if (index === -1) {
      // Si el personaje no está en la lista, agrégalo
      this.selectedCharacters.next([...currentCharacters, character]);
    } else {
      // Si el personaje ya está en la lista, elimínalo
      this.selectedCharacters.next(currentCharacters.filter(c => c.id !== character.id));
    }
  }

  toggleCharacterSelection(character: any) {
    // Obtén los índices del personaje en ambas listas
    const indexInIds = this.selectedCharacterIds.value.indexOf(character.id);
    const indexInCharacters = this.selectedCharacters.value.findIndex(c => c.id === character.id);
  
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
  
}
