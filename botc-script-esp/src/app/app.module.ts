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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PersonajesComponent
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
