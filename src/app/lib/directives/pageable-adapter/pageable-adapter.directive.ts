import { Directive, HostListener, Inject, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { PAGEABLE_DATA_CONSUMER_INTERFACE_TOKEN } from '../../tokens/pageable-data-consumer.token';
import { PageableDataProvider } from '../../models/pageable-data-provider.interface';
import { PageableDataConsumer } from '../../models/pageable-data-consumer.interface';

@Directive( {
	selector: '[arPageableAdapter]'
} )
export class PageableAdapterDirective<T> implements OnInit, OnDestroy {
	@Input() pageableDataProvider: PageableDataProvider<T>;

	private onDestroySource$ = new Subject();

	constructor(
		@Inject( PAGEABLE_DATA_CONSUMER_INTERFACE_TOKEN ) private pageableDataConsumer: PageableDataConsumer<T>
	) {
		if ( !this.pageableDataConsumer ) {
			throw new Error( 'component (implements PageableDataConsumer) can not be null.' );
		}
	}

	ngOnInit() {
		if ( !this.pageableDataProvider ) {
			throw new Error( 'pageableDataSource can not be null.' );
		}

		this.pageableDataProvider.items$.takeUntil( this.onDestroySource$ ).subscribe( ( items: T[] ) => {
			this.pageableDataConsumer.items = items;
		} );

		this.pageableDataProvider.actualPage$.takeUntil( this.onDestroySource$ ).subscribe( ( actualPage: number ) => {
			this.pageableDataConsumer.actualPage = actualPage;
		} )

		this.pageableDataProvider.totalPages$.takeUntil( this.onDestroySource$ ).subscribe( ( totalPages: number ) => {
			this.pageableDataConsumer.totalPages = totalPages;
		} );
		this.pageableDataProvider.itemCount$.takeUntil( this.onDestroySource$ ).subscribe( ( itemsCount: number ) => {
			this.pageableDataConsumer.itemsCount = itemsCount;
		} );

		this.pageableDataProvider.pageSize$.takeUntil( this.onDestroySource$ ).subscribe( ( pageSize: number ) => {
			this.pageableDataConsumer.pageSize = pageSize;
		} );

		this.pageableDataConsumer.pageChange.asObservable()
			.flatMap( ( newPage: number ) => this.pageableDataProvider.goToPage$( newPage ) )
			.takeUntil( this.onDestroySource$ )
			.subscribe();

		if ( this.pageableDataConsumer.pageSizeChange ) {
			this.pageableDataConsumer.pageSizeChange.asObservable()
				.flatMap( ( newPageSize: number ) => {
					this.pageableDataProvider.setPageSize( newPageSize );
					return this.pageableDataProvider.refresh$();
				} )
				.takeUntil( this.onDestroySource$ )
				.subscribe();
		}
	}

	ngOnDestroy() {
		this.onDestroySource$.next();
		this.onDestroySource$.unsubscribe();
	}
}
