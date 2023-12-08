import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { jsPDF } from 'jspdf';
import { FolioContentService} from '../folio/folio.service'
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-side-buttons',
  templateUrl: './side-buttons.component.html',
  styleUrls: ['./side-buttons.component.scss']
})
export class SideButtonsComponent implements OnInit {
  @Output() generateJson = new EventEmitter<void>(); // Emite un evento sin valor


  constructor(private folioContentService: FolioContentService) { }

  ngOnInit(): void {
  }

  generatePdf() {
    const doc = new jsPDF();
    const element = document.getElementById('folio');

    // Aquí debes recoger el contenido del componente 'folio'.
    // Esto podría hacerse a través de una referencia directa, un servicio, 
    // o emitiendo un evento que el componente 'folio' escuche para proporcionar los datos.

    const content = this.getFolioContent(); // Implementa esta función según tu necesidad.


    if (element)
    html2canvas(element, {     
       scale: 1.5,
      useCORS: true}
      ).then((canvas) => {

      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF({
        //orientation: 'landscape',
      });
  
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('folio.pdf');
    });

    // doc.text(content, 10, 10);
    //doc.save('folio.pdf');
  }

  private getFolioContent(): string {
    // Implementa la lógica para obtener el contenido del folio.
    // Esto es solo un placeholder y necesita ser implementado de acuerdo a tu aplicación.
    return this.folioContentService.getContent();
  }

  onGenerateJsonClick(): void {
    this.generateJson.emit(); // Emitir el evento cuando se hace clic en el botón
  }


}
