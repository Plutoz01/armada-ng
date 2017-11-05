import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NamedTemplateDirective } from './directives/named-template/named-template.directive';

@NgModule( {
	imports: [
		CommonModule
	],
	declarations: [
		NamedTemplateDirective
	],
	exports: [
		NamedTemplateDirective
	]
} )
export class CoreModule {
}
