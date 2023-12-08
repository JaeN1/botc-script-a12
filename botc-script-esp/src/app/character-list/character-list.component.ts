import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonajesService } from '../personajes/personajes.service';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  @Output() personajeSeleccionado = new EventEmitter<any>();

  characters: any[] = []; // Debería ser llenado con los personajes
  filteredCharacters: any[] = [];
  personajesAgrupados: any = {}; // Un objeto para almacenar los personajes agrupados
  groupedCharacters: { [key: string]: any[] } = {}; // Objeto para almacenar los personajes agrupados
  selectedCharacters: any[] = [];
  
  roleTypeTranslations: { [key: string]: string } = {
    'townsfolk': 'Aldeano',
    'outsider': 'Forastero',
    'minion': 'Esbirro',
    'demon': 'Demonio',
    'travellers': 'Viajeros',
    'fabled': 'Fábulas'
  };

  constructor(
    private personajesService: PersonajesService,
    private characterService: CharacterService 
  ) { 
    characterService.selectedCharacters$.subscribe(selectedCharacters => {
      this.selectedCharacters = selectedCharacters;
    });
  }

  ngOnInit(): void {
    this.agruparPersonajesPorRoleType(this.characters);
    
    this.filteredCharacters = this.characters; // Inicialmente, todos los personajes están filtrados

    this.personajesService.getPersonajesConTraducciones().subscribe(
      (data: any[]) => {
        this.characters = data; // Asigna los datos de personajes a la propiedad
        this.filteredCharacters = data; // Asegúrate de que esta línea esté presente
        this.agruparPersonajesPorRoleType(data); // Asegúrate de llamar a esta función aquí
      },
      (error) => {
        console.error('Error fetching characters', error);
      }
    );

    // this.personajesService.getPersonajes().subscribe(personajes => {
    //   this.agruparPersonajesPorRoleType(personajes);
    // });

  }

  filterCharacters(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filtered = this.characters?.filter(character =>
      character.name.toLowerCase().includes(filterValue) ||
      character.nombre?.toLowerCase().includes(filterValue)
    );
  
    this.agruparPersonajesPorRoleType(filtered);
  }
  

  filterCharacters2(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCharacters = this.characters?.filter(character =>
      character.name.toLowerCase().includes(filterValue) ||
      character.nombre?.toLowerCase().includes(filterValue)
    );
  }

  filterCharacters3(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCharacters = this.characters?.filter(character => {
      const nameInEnglish = character.name?.toLowerCase().includes(filterValue);
      const nameInSpanish = character.nombre?.toLowerCase().includes(filterValue);
      return nameInEnglish || nameInSpanish;
    });
  }
  filterCharacters4(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    console.log('Filtrando personajes con: ', filterValue);
  
    // Asegúrate de que los personajes están cargados
    if (!this.characters) {
      console.error('No hay personajes cargados para filtrar');
      return;
    }
  
    this.filteredCharacters = this.characters.filter(character => {
      const nameMatch = character.name?.toLowerCase().includes(filterValue);
      const spanishNameMatch = character.nombre?.toLowerCase().includes(filterValue);
      return nameMatch || spanishNameMatch;
    });
  
    console.log('Personajes filtrados: ', this.filteredCharacters);
  }
  

  clearSelection(): void {
    // Lógica para limpiar la selección
  }

  randomizeSelection(): void {
    // Lógica para aleatorizar la selección
  }

  getIconPath(iconFileName: string): string {
    // console.log(iconFileName)
    return `assets/images/icon/${iconFileName}_icon.png`;
  }

  seleccionarPersonaje(personaje: any) {
    // Solo emite el evento si el personaje no estaba seleccionado antes
    if (this.personajeSeleccionado !== personaje) {
       this.personajeSeleccionado.emit(personaje);
       //this.characterService.selectCharacter(personaje);

        this.characterService.toggleCharacterSelection(personaje);
      }
    }
    
    isSelected(character: any): boolean {
      return this.selectedCharacters.some((selectedCharacter) => selectedCharacter.id === character.id);
    }

  agruparPersonajesPorRoleType(personajes: any[]) {
    this.personajesAgrupados = {};
    personajes.forEach(personaje => {
      if (!this.personajesAgrupados[personaje.roleType]) {
        this.personajesAgrupados[personaje.roleType] = [];
      }
      this.personajesAgrupados[personaje.roleType].push(personaje);
    });
  }

  objectKeys = Object.keys;



}
