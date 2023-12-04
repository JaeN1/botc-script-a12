import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  private apiUrl = '../assets/roles.json'

  constructor(private http: HttpClient) { }

  private personajes = [
    { nombre: 'Personaje1', tipo: 'Townsfolk', edicion: 'Trouble Brewing', descripcion: 'Descripción del Personaje1' },
    { nombre: 'Personaje2', tipo: 'Outsider', edicion: 'Bad Moon Rising', descripcion: 'Descripción del Personaje2' },
    // ...otros personajes
  ];

  getPersonajes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  private selectedSortSubject = new BehaviorSubject<string>('None');
  selectedSort$ = this.selectedSortSubject.asObservable();

  private selectedEditionsSubject = new BehaviorSubject<string[]>([]);
  selectedEditions$ = this.selectedEditionsSubject.asObservable();

  updateSelectedSort(selectedSort: string) {
    this.selectedSortSubject.next(selectedSort);
  }

  updateSelectedEditions(selectedEditions: string[]) {
    this.selectedEditionsSubject.next(selectedEditions);
  }
}
