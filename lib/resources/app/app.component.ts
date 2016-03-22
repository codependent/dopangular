import { Component } from 'angular2/core';
import { TechnologiesService } from './services';

@Component({
    selector: 'my-app',
    templateUrl: 'index-angular',
    providers: [TechnologiesService]
})
export class AppComponent {
  name: string;
  technologies: Array<string>;
  
  constructor(public technologiesService: TechnologiesService) {
    this.name = 'DopAngular';
    this.technologies = technologiesService.technologies;
  }
  addTechnology(tech: HTMLInputElement) {
    if (tech.value.trim() != "") { 
      this.technologies.push(tech.value);
      tech.value = null;
    }
  }
  doneTyping($event) {
    if($event.which === 13 && $event.target.value.trim() != "") {
      this.technologies.push($event.target.value);
      $event.target.value = null;
    }
  }
}