import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component( {
	selector: 'ar-card-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
} )
export class CardHeaderComponent {
	@Input() collapsible = false;
	@Input() opened = true;
	@Output() openedChanged = new EventEmitter<boolean>();

	onCollapseToggle() {
		if ( this.collapsible ) {
			this.opened = !this.opened;
			this.openedChanged.emit( this.opened );
		} else {
			throw new Error( 'Invalid state: component is not collapsible' );
		}
	}
}
