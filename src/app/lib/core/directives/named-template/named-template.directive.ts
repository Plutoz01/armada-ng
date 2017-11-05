import { Directive, Input, TemplateRef } from '@angular/core';

@Directive( {
	selector: '[arNamedTemplate]'
} )
export class NamedTemplateDirective {

	/* tslint:disable:no-input-rename */
	@Input( 'arNamedTemplate' ) name: string;

	constructor( public template: TemplateRef<any> ) {
	}

}
