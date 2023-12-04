import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'botc-script-esp';
  personajesSeleccionados: any[] = [];
  scriptName = 'Nombre del Guión';
  author = 'Autor';
  alturaCabecera = 50; // Altura hasta donde llega la cabecera incluyendo la línea de separación

  @ViewChild('folioCanvas') folioCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.setCabeceraDefault();
  }
  ngOnInit() {
    this.setCabeceraDefault();
  }

  editarCabecera2() {
    this.scriptName = prompt('Enter Script Name:', this.scriptName) || this.scriptName;
    this.author = prompt('Enter Author:', this.author) || this.author;
    
  }
  setCabeceraDefault() {
    // Verificar si la referencia al canvas está disponible
    if (this.folioCanvas && this.folioCanvas.nativeElement) {
      const canvas: HTMLCanvasElement = this.folioCanvas.nativeElement;
      const ctx = canvas.getContext('2d');
  
      if (ctx) {
        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        // Configurar estilo para el texto
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
  
        // Dibujar el nombre del guión y el autor
        const scriptNameText = `${this.scriptName} por ${this.author}`;
        ctx.fillText(scriptNameText, 10, 20); // Ajusta la posición según sea necesario
  
        // Dibujar una línea debajo del texto
        ctx.beginPath();
        ctx.moveTo(10, 40); // Comienzo de la línea
        ctx.lineTo(canvas.width - 10, 40); // Fin de la línea
        ctx.stroke();
      } else {
        console.error('El contexto del canvas es nulo.');
      }
    } else {
      console.error('El elemento folioCanvas no está disponible.');
    }
  }
  
  editarCabecera() {
    const newScriptName = prompt('Enter Script Name:', this.scriptName);
    const newAuthor = prompt('Enter Author:', this.author);
  
    if (newScriptName !== null) { // Comprobar si el usuario no presionó "Cancelar"
      this.scriptName = newScriptName;
    }
  
    if (newAuthor !== null) { // Comprobar si el usuario no presionó "Cancelar"
      this.author = newAuthor;
    }
  
    this.actualizarCabeceraCanvas();
  }

  actualizarCabeceraCanvas() {
    if (this.folioCanvas && this.folioCanvas.nativeElement) {
      const canvas: HTMLCanvasElement = this.folioCanvas.nativeElement;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Limpiar solo la parte superior del canvas donde se dibuja la cabecera
        ctx.clearRect(0, 0, canvas.width, 50);
  
        // Redibujar la cabecera
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`${this.scriptName} por ${this.author}`, 10, 20);
  
        ctx.beginPath();
        ctx.moveTo(10, 50);
        ctx.lineTo(canvas.width - 10, 50);
        ctx.stroke();
      } else {
        console.error('El contexto del canvas es nulo.');
      }
    } else {
      console.error('El elemento folioCanvas no está disponible.');
    }
  }
  


  manejarSeleccion(personaje: any) {
    if (!this.personajesSeleccionados.includes(personaje)) {
      this.personajesSeleccionados.push(personaje);
      this.agregarPersonajeAlCanvas(personaje);
    }
  }

  agregarPersonajeAlCanvas(personaje: any) {
    const canvas = document.getElementById('folioCanvas') as HTMLCanvasElement;
    
    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error("2D rendering context not supported.");
      return;
    }

    /// Espaciado entre líneas
    const alturaCabecera = 50; // Altura de la cabecera
    const lineHeight = 20; // Espaciado entre líneas de personajes
    const yPosition = alturaCabecera + (this.personajesSeleccionados.length * lineHeight) + 5; // +5 para un pequeño espacio debajo de la línea

    // Dibujar el nombre del personaje en una nueva línea
    ctx.fillText(personaje.name, 50, yPosition);
  }


  
  descargarPDF() {
    console.log('descargarPDF llamado');
    if (!this.folioCanvas) {
      console.error('this.folioCanvas es nulo');
      return;
    }

    if (this.folioCanvas && this.folioCanvas.nativeElement) {
    const canvas = this.folioCanvas.nativeElement;

    // Capturar el contenido del canvas como imagen
    html2canvas(canvas).then((canvasImg) => {
      console.log('html2canvas ejecutado');
      // Crear un nuevo documento PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      console.log('jsPDF creado');
      const imgData = canvasImg.toDataURL('image/png');

      // Agregar la imagen al PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

      // Descargar el PDF
      console.log('Ancho del canvas:', canvas.width);
      console.log('Alto del canvas:', canvas.height);
      pdf.save('canvas.pdf');
    });
  }

  }
}