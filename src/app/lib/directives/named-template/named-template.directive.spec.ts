import { NamedTemplateDirective } from './named-template.directive';

describe( 'NamedTemplateDirective', () => {
	it( 'should create an instance', () => {
		const directive = new NamedTemplateDirective( null );
		expect( directive ).toBeTruthy();
	} );
} );
