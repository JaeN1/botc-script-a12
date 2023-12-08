import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TranslationService } from './translation.service';
import { PersonajesService } from './personajes/personajes.service';


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
  selectedCharacters: any[] = []; // Asegúrate de que esta propiedad esté actualizada con los personajes seleccionados


  @ViewChild('folioCanvas') folioCanvas!: ElementRef<HTMLCanvasElement>;
  personajes: any[] | undefined;

  ngAfterViewInit() {
    this.setCabeceraDefault();
  }
  ngOnInit() {
  
    this.setCabeceraDefault();
    
    this.personajesService.getPersonajesConTraducciones().subscribe(personajesTraducidos => {
      this.personajes = personajesTraducidos;
    });    
  }

  constructor( private personajesService: PersonajesService ){

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
  
  
  manejarSeleccion(personajeSeleccionado: any) {
    // Asegúrate de que 'this.personajes' está definido antes de usar 'find'
    if (this.personajes) {
      const personajeTraducido = this.personajes.find(p => p.id === personajeSeleccionado.id);
  
      if (personajeTraducido) {
        if (!this.personajesSeleccionados.includes(personajeTraducido)) {
          this.personajesSeleccionados.push(personajeTraducido);
          this.agregarPersonajeAlCanvas(personajeTraducido);
        }
      } else {
        console.error('Personaje seleccionado no encontrado en la lista traducida');
      }
    } else {
      console.error('La lista de personajes no está definida');
    }

    // Asegúrate de que estás agregando el personaje a la lista correcta
    this.personajesSeleccionados.push(personajeSeleccionado);

    console.log("AAAAAAAAAAAAAAAAA")
    console.log(this.personajesSeleccionados)
  }
  
  handlePersonajeSeleccionado(personaje: any) {
    // Asegúrate de que estás agregando el personaje a la lista correcta
    this.personajesSeleccionados.push(personaje);
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
  
    // Espaciado entre líneas y altura inicial de la cabecera
    const alturaCabecera = 50;
    const lineHeight = 32;
    const iconSize = 32;
    const iconPadding = 10; // Espacio entre el icono y el nombre
    //const yPosition = alturaCabecera + (this.personajesSeleccionados.length * lineHeight) + 5;
    const textYPosition = alturaCabecera + (this.personajesSeleccionados.length * lineHeight) + 5;
    const descriptionYPosition = textYPosition + 20; // Ajusta según sea necesario
    const textXPosition = 100; // Posición X fija para el texto
    const iconXPosition = 50; // Posición X fija para el icono
    // Establece el espaciado y los estilos
    const startYPosition = 100; // Y posición inicial para comenzar a dibujar
    // Calcula la posición Y basada en cuántos personajes han sido ya dibujados
    const yPosition = 10 + (this.personajesSeleccionados.length * (lineHeight + 10));

    //const yPosition = startYPosition + (this.personajesSeleccionados.length * lineHeight * 2);


    // Configurar el estilo del texto
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
  
    // Comprobar si el personaje tiene un ícono
    if (personaje.icon) {
      const iconImage = new Image();
      iconImage.onload = () => {
        ctx.drawImage(iconImage, iconXPosition, yPosition, iconSize, iconSize);

        // Dibuja el nombre del personaje
        ctx.fillText(personaje.name, textXPosition, yPosition + lineHeight);
  
        // Cambia el estilo de la fuente para la descripción si es necesario
        ctx.font = 'italic 14px Arial'; // Estilo para la descripción
        ctx.fillText(personaje.description, textXPosition, yPosition + lineHeight * 2);
        
      };
      iconImage.onerror = () => {
        // Si hay un error al cargar el icono, dibujar solo el nombre
        ctx.fillText(personaje.nombre, 50, yPosition);
        //Descripcion
        ctx.fillText(personaje.description, 50, descriptionYPosition);

      };
      iconImage.src = this.getIconPath(personaje.name); // Establecer la fuente después de definir onload y onerror
    } else {
      // Dibuja solo el texto si no hay icono
      ctx.fillText(personaje.name, textXPosition, yPosition + lineHeight);
      ctx.font = 'italic 14px Arial'; // Estilo para la descripción
      ctx.fillText(personaje.description, textXPosition, yPosition + lineHeight * 2);

    }
  }
  
  getIconPath(iconFileName: string): string {
    // console.log(iconFileName)
    return `assets/images/icon/${iconFileName}_icon.png`;
  }
  
  descargarPDF() {
    //console.log('descargarPDF llamado');
    if (!this.folioCanvas) {
      console.error('this.folioCanvas es nulo');
      return;
    }

    if (this.folioCanvas && this.folioCanvas.nativeElement) {
    const canvas = this.folioCanvas.nativeElement;

    // Capturar el contenido del canvas como imagen
    html2canvas(canvas).then((canvasImg) => {
      //console.log('html2canvas ejecutado');
      // Crear un nuevo documento PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      //console.log('jsPDF creado');
      const imgData = canvasImg.toDataURL('image/png');

      // Agregar la imagen al PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

      // Descargar el PDF
      //console.log('Ancho del canvas:', canvas.width);
      //console.log('Alto del canvas:', canvas.height);
      pdf.save('canvas.pdf');
    });
    }
  }


  onGenerateJson(): void {
    const jsonToDownload = [
      { "id": "_meta", "author": this.author, "name": this.scriptName },
      ...this.personajesSeleccionados.map(character => character.id) // Usar personajesSeleccionados en lugar de selectedCharacters
    ];
    this.downloadJson(jsonToDownload);
  }
  

  private downloadJson(jsonObject: any): void {
    const jsonStr = JSON.stringify(jsonObject);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected-characters.json';
    document.body.appendChild(a); // necesario para que funcione en Firefox
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a); // limpiar el DOM
  }
}