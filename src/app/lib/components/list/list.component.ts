import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';



@Component( {
	selector: 'ar-list',
	templateUrl: './list.component.html'
} )
export class ListComponent<T> {
	@Input() items: T[];
	@Input() listItemTemplateRef: TemplateRef< { $implicit: T } >;
	@Input() selectable = true;
	@Input() selected: T;

	@Output() click = new EventEmitter<T>();
	@Output() selectionChanged = new EventEmitter<T>();

	onClick( item: T ) {
		if ( this.selectable ) {
			this.selected = this.selected === item ? null : item;
			this.selectionChanged.emit( this.selected );
		}
		this.click.emit( item );
	}

	isSelected( item: T): boolean {
		return this.selectable ? this.selected === item : false;
	}
}
