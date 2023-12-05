// personajes.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonajesService } from './personajes.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss']
})

export class PersonajesComponent implements OnInit {
  @Output() personajeSeleccionado = new EventEmitter<any>();

  personajes: any[] = [];
  personajesAgrupados: any = {}; // Un objeto para almacenar los personajes agrupados
  
  constructor(private personajesService: PersonajesService) { }

  ngOnInit() {
    // this.loadPersonajes();
    this.personajesService.getPersonajes().subscribe(personajes => {
      this.agruparPersonajesPorRoleType(personajes);
    });
  }

  loadPersonajes() {
    this.personajesService.getPersonajes().subscribe((data: any) => {
      this.personajes = data;
    });
  }

  agruparPersonajesPorRoleType(personajes: any[]) {
    personajes.forEach(personaje => {
      if (!this.personajesAgrupados[personaje.roleType]) {
        this.personajesAgrupados[personaje.roleType] = [];
      }
      this.personajesAgrupados[personaje.roleType].push(personaje);
    });
  }

  objectKeys = Object.keys;

  
  getIcon(tipo: string): string {
    // Lógica para obtener el icono según el tipo
    return 'ruta/al/icono.png';
  }

  getIconPath(iconFileName: string): string {
    // console.log(iconFileName)
    return `assets/images/icon/${iconFileName}_icon.png`;
  }

  seleccionarPersonaje(personaje: any) {
    // Solo emite el evento si el personaje no estaba seleccionado antes
    if (this.personajeSeleccionado !== personaje) {
       this.personajeSeleccionado.emit(personaje);
    }
  }


}