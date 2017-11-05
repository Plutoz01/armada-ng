import { AfterViewInit, Component, ContentChild, EventEmitter, forwardRef, Input, Output, TemplateRef, ViewChild, } from '@angular/core';
import { PageableDataConsumer } from '../../../core/models/pageable-data-consumer.interface';
import { PAGEABLE_DATA_CONSUMER_INTERFACE_TOKEN } from '../../../core/tokens/pageable-data-consumer.token';
import { ListComponent } from '../../../list/components/list/list.component';
import { PaginatorComponent } from '../../../paginator/components/paginator/paginator.component';

@Component( {
	selector: 'ar-pageable-list',
	templateUrl: './pageable-list.component.html',
	styleUrls: [ './pageable-list.component.scss' ],
	providers: [ {
		provide: PAGEABLE_DATA_CONSUMER_INTERFACE_TOKEN,
		useExisting: forwardRef( () => PageableListComponent )
	} ]
} )
export class PageableListComponent<T> implements AfterViewInit, PageableDataConsumer<T> {
	static readonly defaultPageSizes = [ 10, 25, 50, 100 ];

	// list related inputs
	@Input() items: T[];
	@Input() selectable = true;
	@Input() selected: T;

	// paginator related inputs
	@Input() actualPage = 0;
	@Input() totalPages = 0;
	@Input() firstAndLastButtonVisible = true;
	@Input() prevAndNextButtonVisible = true;
	@Input() pageRangeWidth: number = PaginatorComponent.defaultPageRangeWidth;

	// other inputs
	@Input() itemsCount?: number;
	@Input() pageSize: number;
	@Input() pageSizes: number[] = PageableListComponent.defaultPageSizes;

	// list related outputs
	@Output() click = new EventEmitter<T>();
	@Output() selectionChanged = new EventEmitter<T>();

	// paginator related outputs
	@Output() pageChange = new EventEmitter<number>();

	// other outputs
	@Output() pageSizeChange = new EventEmitter<number>();

	@ViewChild( ListComponent ) list: ListComponent<T>;
	@ContentChild( TemplateRef ) itemTemplate: TemplateRef<any>;

	ngAfterViewInit() {
		this.list.itemTemplate = this.itemTemplate;
	}

	onPageSizeChange( newPageSize: string ) {
		this.pageSizeChange.emit( parseInt( newPageSize, 0 ) );
	}
}
