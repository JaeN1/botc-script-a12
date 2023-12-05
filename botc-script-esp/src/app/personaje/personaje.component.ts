import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.scss']
})
export class PersonajeComponent implements OnInit {
  @Input() personaje: any;

  constructor() { }

  ngOnInit(): void {
  }

  onAction1() {
    // Lógica para la acción 1
  }

  onAction2() {
    // Lógica para la acción 2
  }
}
