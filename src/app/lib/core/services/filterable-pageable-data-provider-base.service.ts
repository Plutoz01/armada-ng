import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Filter } from '../models/filter.interface';
import { FilterableDataProvider } from '../models/filterable-data-provider.interface';
import { PageableDataProvider } from '../models/pageable-data-provider.interface';


export abstract class FilterablePageableDataProviderBase<T, F extends Filter>
	implements PageableDataProvider<T>, FilterableDataProvider<T, F> {

	static readonly defaultPageSize = 10;

	protected itemsSource = new BehaviorSubject<T[]>( [] );
	protected itemCountSource = new BehaviorSubject<number>( 0 );
	private pageSizeSource = new BehaviorSubject<number>( FilterablePageableDataProviderBase.defaultPageSize );
	private actualPageSource = new BehaviorSubject<number>( 0 );
	private totalPages: Observable<number>;
	private filterSource = new BehaviorSubject<F>( null );

	constructor() {
		this.totalPages = this.itemCountSource.combineLatest( this.pageSizeSource,
			( itemCount: number, pageSize: number ) => Math.ceil( itemCount / pageSize ) );
	}

	get items$(): Observable<T[]> {
		return this.itemsSource.asObservable();
	}

	get itemCount$(): Observable<number> {
		return this.itemCountSource.asObservable();
	}

	get actualPage$(): Observable<number> {
		return this.actualPageSource.asObservable();
	}

	get totalPages$(): Observable<number> {
		return this.totalPages;
	}

	get pageSize$(): Observable<number> {
		return this.pageSizeSource.asObservable();
	}

	get filter$(): Observable<F> {
		return this.filterSource.asObservable();
	}

	refresh$(): Observable<T[]> {
		return Observable.zip(
			this.actualPage$,
			this.pageSize$,
			this.filter$
		).first().flatMap( ( [ actualPage, pageSize, filter ]: [ number, number, F ] ) => {
			return this.getItems$( actualPage, pageSize, filter );
		} )
			.do( ( newItems: T[] ) => this.itemsSource.next( newItems ) );
	}

	goToPage$( targetPage: number ): Observable<T[]> {
		return Observable.zip(
			this.actualPage$,
			this.totalPages$
		).first().flatMap( ( [ actualPage, totalPages ]: [ number, number ] ) => {
			if ( actualPage === targetPage ) {
				return this.items$.first();
			}
			if ( targetPage < 0 || targetPage > totalPages ) {
				throw new Error( `Target page is out of valid range ( 0-${ totalPages } ). actual: ${ targetPage }` );
			}

			this.actualPageSource.next( targetPage );
			return this.refresh$();
		} );
	}

	nextPage$(): Observable<T[]> {
		return Observable.zip(
			this.actualPage$,
			this.totalPages$
		).first().flatMap( ( [ actualPage, totalPages ]: [ number, number ] ) => {
			if ( actualPage === totalPages ) {
				return this.items$.first();
			}

			this.actualPageSource.next( actualPage + 1 );
			return this.refresh$();
		} );
	}

	previousPage$(): Observable<T[]> {
		return this.actualPage$.first().flatMap( ( actualPage: number ) => {
			if ( actualPage === 0 ) {
				return this.items$.first();
			}

			this.actualPageSource.next( actualPage - 1 );
			return this.refresh$();
		} );
	}

	setPageSize( targetPageSize: number ) {
		if ( targetPageSize <= 0 ) {
			throw new Error( 'Page size must be greather than 0.' );
		}
		this.pageSizeSource.next( targetPageSize );
		this.actualPageSource.next( 0 );
	}

	updateFilter$( filter: F ): Observable<T[]> {
		this.filterSource.next( filter );
		return this.refresh$().first();
	}

	protected abstract getItems$( actualPage: number, pageSize: number, filter?: F ): Observable<T[]>;
}
