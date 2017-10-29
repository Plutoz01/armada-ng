import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { NamedTemplateDirective } from '../../directives/named-template/named-template.directive';

@Component( {
	selector: 'ar-card',
	templateUrl: './card.component.html',
	styleUrls: [ './card.component.scss' ],
	animations: [
		trigger( 'collapseInOut', [
			transition( 'void => enabled', [
				animate( 100, keyframes( [
					style( { height: '0' } ),
					style( { height: '*' } )
				] ) )
			] ),
			transition( 'enabled => void', [
				animate( 100, style( { height: '0' } ) )
			] )
		] )
	]
} )
export class CardComponent {
	static readonly headerTemplateName = 'header';
	static readonly contentTemplateName = 'content';
	static readonly footerTemplateName = 'footer';

	@Input() collapsible = false;
	@Input() opened = true;
	@ContentChildren( NamedTemplateDirective ) namedTemplateDirectives: QueryList<NamedTemplateDirective>;

	get contentTemplate(): TemplateRef<any> | undefined {
		const contentTemplateDirective = this.namedTemplateDirectives.find(
			( namedTemplate: NamedTemplateDirective ) => namedTemplate.name === CardComponent.contentTemplateName
		);
		return contentTemplateDirective ? contentTemplateDirective.template : undefined;
	}

	get headerTemplate(): TemplateRef<any> | undefined {
		const headerTemplateDirective = this.namedTemplateDirectives.find(
			( namedTemplate: NamedTemplateDirective ) => namedTemplate.name === CardComponent.headerTemplateName
		);
		return headerTemplateDirective ? headerTemplateDirective.template : undefined;
	}

	get footerTemplate(): TemplateRef<any> | undefined {
		const footerTemplateDirective = this.namedTemplateDirectives.find(
			( namedTemplate: NamedTemplateDirective ) => namedTemplate.name === CardComponent.footerTemplateName
		);
		return footerTemplateDirective ? footerTemplateDirective.template : undefined;
	}

	onCollapseToggle() {
		if ( this.collapsible ) {
			this.opened = !this.opened;
		}
	}

	get isContentVisible(): boolean {
		return !this.collapsible || this.opened;
	}

	get collapsibleAnimationState(): 'enabled' | 'disabled' {
		return this.collapsible ? 'enabled' : 'disabled';
	}

}
