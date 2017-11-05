import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { NamedTemplateDirective } from '../../../core/directives/named-template/named-template.directive';

@Component( {
	selector: 'ar-modal-dialog',
	templateUrl: './modal-dialog.component.html',
	styleUrls: [ './modal-dialog.component.scss' ],
	animations: [
		trigger( 'rollDown', [
			transition( ':enter', [
				animate( '100ms', keyframes( [
					style( { transform: 'translateY(-100%)' } ),
					style( { transform: 'translateY(0)' } )
				] ) )
			] )
		] ),
		trigger( 'fadeOut', [
			transition( ':leave', [
				animate( '200ms', keyframes( [
					style( { opacity: '1' } ),
					style( { opacity: '0' } )
				] ) )
			] )
		] )
	]
} )
export class ModalDialogComponent {
	static readonly titleTemplateName = 'title';
	static readonly contentTemplateName = 'content';
	static readonly footerTemplateName = 'footer';

	@Input() visible = false;
	@Input() closable = false;
	@Output() closed = new EventEmitter();

	@ContentChildren( NamedTemplateDirective ) namedTemplateDirectives: QueryList<NamedTemplateDirective>;

	get titleTemplate(): TemplateRef<any> | undefined {
		return this.getTemplateByName( ModalDialogComponent.titleTemplateName );
	}

	get contentTemplate(): TemplateRef<any> | undefined {
		return this.getTemplateByName( ModalDialogComponent.contentTemplateName );
	}

	get footerTemplate(): TemplateRef<any> | undefined {
		return this.getTemplateByName( ModalDialogComponent.footerTemplateName );
	}

	onClose() {
		if ( this.closable ) {
			this.closed.emit();
		}
	}

	private getTemplateByName( name: string ): TemplateRef<any> | undefined {
		const namedTemplateDirective = this.namedTemplateDirectives.find(
			( namedTemplate: NamedTemplateDirective ) => namedTemplate.name === name
		);
		return namedTemplateDirective ? namedTemplateDirective.template : undefined;
	}


}
