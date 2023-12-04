import { Component, OnInit } from '@angular/core';
import { PersonajesService } from '../../app/personajes/personajes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  selectedSort: string = 'None';
  editions: string[] = ['Trouble Brewing', 'Bad Moon Rising', 'Sects and Violets', 'Kickstarter Experimental', 'Unreleased Experimental'];
  selectedEditions: string[] = [];


  constructor(private personajesService: PersonajesService) { }

  ngOnInit(): void {
    
  }
  updateSelectedSort(selectedSort: string) {
    this.personajesService.updateSelectedSort(selectedSort);
  }

  updateSelectedEditions(selectedEditions: string[]) {
    this.personajesService.updateSelectedEditions(selectedEditions);
  }

}
