System.register(['angular2/core', './services'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, services_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (services_1_1) {
                services_1 = services_1_1;
            }],
        execute: function() {
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
            AppComponent = (function () {
                function AppComponent(technologiesService) {
                    this.name = 'DopAngular';
                    this.technologies = technologiesService.technologies;
                }
                AppComponent.prototype.addTechnology = function (tech) {
                    if (tech.value.trim() != "") {
                        this.technologies.push(tech.value);
                        tech.value = null;
                    }
                };
                AppComponent.prototype.doneTyping = function ($event) {
                    if ($event.which === 13 && $event.target.value.trim() != "") {
                        this.technologies.push($event.target.value);
                        $event.target.value = null;
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        bindings: [services_1.TechnologiesService]
                    }),
                    core_1.View({
                        templateUrl: 'index-angular'
                    }), 
                    __metadata('design:paramtypes', [services_1.TechnologiesService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map