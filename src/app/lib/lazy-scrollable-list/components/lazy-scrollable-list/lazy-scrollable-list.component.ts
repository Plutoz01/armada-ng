import { AfterViewInit, Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild, } from '@angular/core';
import { LazyLoadDataConsumer } from '../../../core/models/lazy-load-data-consumer.interface';
import { ListComponent } from '../../../list/components/list/list.component';

@Component( {
	selector: 'ar-lazy-scrollable-list',
	templateUrl: './lazy-scrollable-list.component.html',
	styleUrls: [ './lazy-scrollable-list.component.scss' ]
} )
export class LazyScrollableListComponent<T> implements AfterViewInit, LazyLoadDataConsumer<T> {
	@Input() items: T[] = [];
	@Input() hasMore = false;
	@Input() scrollHeight?: string;
	@Input() autoScroll = true;
	@Output() loadMore = new EventEmitter<void>();

	@ViewChild( ListComponent ) listComponent: ListComponent<T>;
	@ContentChild( TemplateRef ) itemTemplate: TemplateRef<any>;

	ngAfterViewInit() {
		this.listComponent.itemTemplate = this.itemTemplate;
	}

	onBottomReached() {
		if ( this.autoScroll && this.hasMore ) {
			this.loadMore.emit();
		}
	}
}
