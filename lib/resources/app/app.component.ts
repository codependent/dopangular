import {Component, View, /*bootstrap*/} from 'angular2/core';
import {TechnologiesService} from './services';

/*
@Component({
  selector: 'my-app',
  appInjector: [TechnologiesService]
})
@View({
  templateUrl: 'index-angular',
  directives:[NgFor]
})
class MyAppComponent {
  name: string;
  technologies: Array<string>;
  
  constructor(technologiesService: TechnologiesService) {
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

bootstrap(MyAppComponent);*/

@Component({
    selector: 'my-app',
    bindings: [TechnologiesService]
})
@View({
  templateUrl: 'index-angular'
})
export class AppComponent {
  name: string;
  technologies: Array<string>;
  
  constructor(technologiesService: TechnologiesService) {
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