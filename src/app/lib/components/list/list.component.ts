import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
	selector: 'ar-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']

})
export class ListComponent<T> {

	@Input() items: T[];
	@Input() selectable = true;
	@Input() selected: T;
	@Input() emptyPlaceholder = 'No items to display';

	@Output() click = new EventEmitter<T>();
	@Output() selectionChanged = new EventEmitter<T>();

	@ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

	onClick(item: T) {
		if (this.selectable) {
			this.selected = this.selected === item ? null : item;
			this.selectionChanged.emit(this.selected);
		}
		this.click.emit(item);
	}

	isSelected(item: T): boolean {
		return this.selectable ? this.selected === item : false;
	}

	get customItemTemplate(): TemplateRef<any> | null {
		return this.itemTemplate;
	}
}
