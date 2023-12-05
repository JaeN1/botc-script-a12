import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Importa las bibliotecas necesarias
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { PersonajeComponent } from './personaje/personaje.component';
import { FolioComponent } from './folio/folio.component';
import { FiltersComponent } from './filters/filters.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { SideButtonsComponent } from './side-buttons/side-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PersonajesComponent,
    PersonajeComponent,
    FolioComponent,
    FiltersComponent,
    CharacterListComponent,
    SideButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  // Configura las bibliotecas como proveedores en el módulo
  constructor() {
    // Configuración de html2canvas
    (window as any).html2canvas = html2canvas;

    // Configuración de jspdf
    (window as any).jspdf = jsPDF;
  }
}
