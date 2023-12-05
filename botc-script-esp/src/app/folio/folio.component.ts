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
  personajesSeleccionados: any[] = [];
  selectedCharacter: any;
  selectedCharacters: any[] = []; // Inicializa como un arreglo vacío

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
}
