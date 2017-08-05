import { Directive, HostListener, Inject, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { PAGEABLE_DATA_CONSUMER_INTERFACE_TOKEN } from '../../tokens/pageable-data-consumer.token';
import { PageableDataSource } from '../../models/pageable-data-source';
import { PageableDataConsumer } from '../../models/pageable-data-consumer';

@Directive( {
	selector: '[arPageableAdapter]'
} )
export class PageableAdapterDirective<T> implements OnInit, OnDestroy {
	@Input() pageableDataSource: PageableDataSource<T>;

	private onDestroySource$ = new Subject();

	constructor(
		@Inject( PAGEABLE_DATA_CONSUMER_INTERFACE_TOKEN ) private component: PageableDataConsumer<T>
	) {
		if ( !this.component ) {
			throw new Error( 'component (implements PageableDataConsumer) can not be null.' );
		}
	}

	ngOnInit() {
		if ( !this.pageableDataSource ) {
			throw new Error( 'pageableDataSource can not be null.' );
		}

		this.pageableDataSource.items$.takeUntil( this.onDestroySource$ ).subscribe( ( items: T[] ) => {
			this.component.items = items;
		} );

		this.pageableDataSource.actualPage$.takeUntil( this.onDestroySource$ ).subscribe( ( actualPage: number ) => {
			this.component.actualPage = actualPage;
		} )

		this.pageableDataSource.totalPages$.takeUntil( this.onDestroySource$ ).subscribe( ( totalPages: number ) => {
			this.component.totalPages = totalPages;
		} );
		this.pageableDataSource.itemCount$.takeUntil( this.onDestroySource$ ).subscribe( ( itemsCount: number ) => {
			this.component.itemsCount = itemsCount;
		} );

		this.pageableDataSource.pageSize$.takeUntil( this.onDestroySource$ ).subscribe( ( pageSize: number ) => {
			this.component.pageSize = pageSize;
		} );

		this.component.pageChange.asObservable()
			.flatMap( ( newPage: number ) => this.pageableDataSource.goToPage$( newPage ) )
			.takeUntil( this.onDestroySource$ )
			.subscribe();

		if ( this.component.pageSizeChange ) {
			this.component.pageSizeChange.asObservable()
				.flatMap( ( newPageSize: number ) => {
					this.pageableDataSource.setPageSize( newPageSize );
					return this.pageableDataSource.refresh$();
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
