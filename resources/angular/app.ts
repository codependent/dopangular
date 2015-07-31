/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, NgFor} from 'angular2/angular2';

class TechnologiesService {
  technologies: Array<string>;
  constructor() {
    this.technologies = ['Angular 2 Developer Preview', 'Express', 'Jade', 'Gulp', 'Material Design Lite', 'Polymer', 'Sass', 'Karma', 'Mocha', 'Should', 'npm', 'Bower'];
  }
}


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