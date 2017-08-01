import { DataSource, Filter, FilterableDataSource, PageableDataSource } from '../models/data-sources';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class FilterablePageableDataSourceBase<T, F extends Filter>
	implements DataSource<T>, PageableDataSource<T>, FilterableDataSource<T, F> {

	static readonly DefaultPageSize = 10;

	protected _itemsSource = new BehaviorSubject<T[]>( [] );
	protected _itemCountSource = new BehaviorSubject<number>( 0 );
	private _pageSizeSource = new BehaviorSubject<number>( FilterablePageableDataSourceBase.DefaultPageSize );
	private _actualPageSource = new BehaviorSubject<number>( 0 );
	private _totalPages: Observable<number>;
	private _filterSource = new BehaviorSubject<F>( null );

	constructor() {
		this._totalPages = this._itemCountSource.combineLatest( this._pageSizeSource,
			( itemCount: number, pageSize: number ) => Math.ceil( itemCount / pageSize ) );
	}

	protected abstract getItems$( actualPage: number, pageSize: number, filter?: F ): Observable<T[]>;

	refresh$(): Observable<T[]> {
		return Observable.zip(
			this.actualPage$,
			this.pageSize$,
			this.filter$
		).first().flatMap( ( [ actualPage, pageSize, filter ]: [ number, number, F ] ) => {
			return this.getItems$( actualPage, pageSize, filter );
		} )
		.do( ( newItems: T[] ) => this._itemsSource.next( newItems ) );
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

			this._actualPageSource.next( targetPage );
			return this.refresh$();
		} );
	}

	next$(): Observable<T[]> {
		return Observable.zip(
			this.actualPage$,
			this.totalPages$
		).first().flatMap( ( [ actualPage, totalPages ]: [ number, number ] ) => {
			if ( actualPage === totalPages ) {
				return this.items$.first();
			}

			this._actualPageSource.next( actualPage + 1 );
			return this.refresh$();
		} );
	}

	previous$(): Observable<T[]> {
		return this.actualPage$.first().flatMap( ( actualPage: number ) => {
			if ( actualPage === 0 ) {
				return this.items$.first();
			}

			this._actualPageSource.next( actualPage - 1 );
			return this.refresh$();
		} );
	}

	setPageSize( targetPageSize: number ) {
		if ( targetPageSize <= 0 ) {
			throw new Error( 'Page size must be greather than 0.' );
		}
		this._pageSizeSource.next( targetPageSize );
		this._actualPageSource.next( 0 );
	}

	setFilter$( filter: F ): Observable<T[]> {
		this._filterSource.next( filter );
		return this.refresh$().first();
	}

	get items$(): Observable<T[]> {
		return this._itemsSource.asObservable();
	}

	get itemCount$(): Observable<number> {
		return this._itemCountSource.asObservable();
	}

	get actualPage$(): Observable<number> {
		return this._actualPageSource.asObservable();
	}

	get totalPages$(): Observable<number> {
		return this._totalPages;
	}

	get pageSize$(): Observable<number> {
		return this._pageSizeSource.asObservable();
	}

	get filter$(): Observable<F> {
		return this._filterSource.asObservable();
	}
}
