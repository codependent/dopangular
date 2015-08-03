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
}

bootstrap(MyAppComponent);