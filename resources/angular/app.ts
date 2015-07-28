/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, NgFor} from 'angular2/angular2';

// Annotation section
@Component({
  selector: 'my-app'
})
@View({
  templateUrl: 'index-angular',
  directives:[NgFor]
})
// Component controller
class MyAppComponent {
  name: string;
  technologies: Array<string>;
  //technologies : string[]
  
  constructor() {
    this.name = 'DopAngular';
    this.technologies = ['Angular 2 Developer Preview', 'Express', 'Jade', 'Gulp', 'Material Design Lite', 'Polymer', 'Sass', 'Karma', 'Mocha', 'Should', 'npm', 'Bower'];
  }
}

bootstrap(MyAppComponent);