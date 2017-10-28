import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ContentChild } from '@angular/core';
import { CardHeaderComponent } from './header/header.component';

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
	@ContentChild( CardHeaderComponent ) headerComponent: CardHeaderComponent;

	get isOpened(): boolean {
		return !!this.headerComponent ? this.headerComponent.opened : true;
	}

	get isCollapsible(): boolean {
		return !!this.headerComponent ? this.headerComponent.collapsible : false;
	}

	get collapsibleAnimationState(): 'enabled' | 'disabled' {
		return this.isCollapsible ? 'enabled' : 'disabled';
	}

}
