import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolioContentService {
  private content = new BehaviorSubject<string>('');

  // Observable que se puede suscribir para obtener actualizaciones de contenido
  public content$ = this.content.asObservable();

  // Método para actualizar el contenido
  public updateContent(newContent: string) {
    this.content.next(newContent);
  }

  // Método para obtener el contenido actual
  public getContent(): string {
    return this.content.getValue();
  }
}