/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="services.ts" />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {TechnologiesService} from 'angular/services'

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

bootstrap(MyAppComponent);