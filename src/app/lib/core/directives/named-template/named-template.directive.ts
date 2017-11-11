import { Directive, Input, QueryList, TemplateRef } from '@angular/core';

@Directive( {
	selector: '[arNamedTemplate]'
} )
export class NamedTemplateDirective {

	/* tslint:disable:no-input-rename */
	@Input( 'arNamedTemplate' ) name: string;

	static byName( directives: QueryList<NamedTemplateDirective>, name: string ): NamedTemplateDirective | undefined {
		return directives.find(
			( namedTemplate: NamedTemplateDirective ) => namedTemplate.name === name
		);
	}

	static getTemplateByName( directives: QueryList<NamedTemplateDirective>, name: string ): TemplateRef<any> | undefined {
		const namedTemplateDirective = NamedTemplateDirective.byName( directives, name );
		return namedTemplateDirective ? namedTemplateDirective.template : undefined;
	}

	constructor( public template: TemplateRef<any> ) {
	}

}
