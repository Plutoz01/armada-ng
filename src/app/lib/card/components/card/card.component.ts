import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { NamedTemplateDirective } from '../../../core/directives/named-template/named-template.directive';

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
		return this.getTemplateByName( CardComponent.contentTemplateName );

	}

	get headerTemplate(): TemplateRef<any> | undefined {
		return this.getTemplateByName( CardComponent.headerTemplateName );

	}

	get footerTemplate(): TemplateRef<any> | undefined {
		return this.getTemplateByName( CardComponent.footerTemplateName );

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

	private getTemplateByName( name: string ): TemplateRef<any> | undefined {
		const namedTemplateDirective = this.namedTemplateDirectives.find(
			( namedTemplate: NamedTemplateDirective ) => namedTemplate.name === name
		);
		return namedTemplateDirective ? namedTemplateDirective.template : undefined;
	}

}
