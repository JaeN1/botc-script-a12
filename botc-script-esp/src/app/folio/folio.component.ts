import { Component, OnInit } from '@angular/core';
import { PersonajesService } from '../personajes/personajes.service';
import { CharacterService } from '../character.service';
import { FolioContentService } from './folio.service';

@Component({
  selector: 'app-folio',
  templateUrl: './folio.component.html',
  styleUrls: ['./folio.component.scss']
})
export class FolioComponent implements OnInit {
  //LUPA
  zoomedIn = false;
  
  
  personajesSeleccionados: any[] = [];
  selectedCharacter: any;
  selectedCharacters: any[] = []; // Inicializa como un arreglo vacío
  hasTownsfolk: boolean = false;
  showTownsfolkHeader: boolean = false;


  townsfolk: any[] = [];
  outsiders: any[] = [];
  minions: any[] = [];
  demons: any[] = [];


  constructor(private personajesService: PersonajesService,
    private characterService: CharacterService,
    private folioContentService: FolioContentService) { }

  ngOnInit(): void {
    this.characterService.selectedCharacter$.subscribe(character => {
      this.selectedCharacter = character;
    });

      this.characterService.selectedCharacters$.subscribe(characters => {
        this.selectedCharacters = characters;
      });

      this.characterService.hasTownsfolkBeenSelected$.subscribe(hasBeenSelected => {
        this.showTownsfolkHeader = hasBeenSelected;
      });

      this.characterService.getTownsfolkCharacters().subscribe(characters => {
        console.log('Townsfolk Characters:', characters);
        this.townsfolk = characters;
      });
    this.characterService.getOutsiderCharacters().subscribe(characters => this.outsiders = characters);
    this.characterService.getMinionCharacters().subscribe(characters => this.minions = characters);
    this.characterService.getDemonCharacters().subscribe(characters => this.demons = characters);
  }
  
  //LUPA
  toggleZoom() {
    this.zoomedIn = !this.zoomedIn;
    const folio = document.getElementById('folio');
    if (folio) {
        folio.style.transform = this.zoomedIn ? 'scale(1)' : 'scale(0.8)';
    }
}


  manejarAccion(event: any) {
    // Lógica para manejar acciones realizadas en los personajes
  }

  getIconPath(iconFileName: string): string {
    // console.log(iconFileName)
    return `assets/images/icon/${iconFileName}_icon.png`;
  }

    // Llamar a este método cada vez que cambie el contenido que quieres exportar a PDF
    updateContent(newContent: string) {
      this.folioContentService.updateContent(newContent);
    }



    onGenerateJson(selectedCharacters: any[]): void {
      const jsonToDownload = [
        { "id": "_meta", "author": "", "name": "" },
        ...selectedCharacters.map(character => character.id)
      ];
      this.downloadJson(jsonToDownload, 'selected-characters.json');
    }

    private downloadJson(jsonObject: any, fileName: string): void {
      const jsonStr = JSON.stringify(jsonObject);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    }


    removeCharacter(character: any): void {
      // Llamar a la función para eliminar el personaje de la lista de seleccionados
      this.characterService.toggleCharacterSelection(character);
      // Eliminar el personaje de la lista local en el folio
      this.removeFromLocalList(character);
    }

    removeFromLocalList(character: any): void {
      // Implemente la lógica para eliminar el personaje de las listas locales, por ejemplo:
      this.townsfolk = this.townsfolk.filter(c => c.id !== character.id);
      // Repita para outsiders, minions y demons si es necesario
      this.outsiders = this.outsiders.filter(c => c.id !== character.id);
      // ... y así sucesivamente para cada grupo
    }
}
