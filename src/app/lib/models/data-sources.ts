import { Observable } from 'rxjs';

export interface DataSource<T> {
	items$: Observable<T[]>;
	itemCount$: Observable<number>;

	refresh$(): Observable<T[]>;
}

export interface PageableDataSource<T> {
	actualPage$: Observable<number>;
	totalPages$: Observable<number>;
	pageSize$: Observable<number>;

	next$(): Observable<T[]>;
	previous$(): Observable<T[]>;
	goToPage$( targetPage: number ): Observable<T[]>;
	setPageSize( targetPageSize: number );
}

export interface Filter {
	[ filterKey: string ]: string | number
}

export interface FilterableDataSource<T, F extends Filter> {
	filter$: Observable<F>;
	setFilter$( filterModel: F ): Observable<T[]>;
}
