import { Observable } from 'rxjs';

export interface DataSource<T> {
	items$: Observable<T[]>;
	itemCount$: Observable<number>;

	refresh$(): Observable<T[]>;
}

export interface Filter {
	[ filterKey: string ]: string | number
}

export interface FilterableDataSource<T, F extends Filter> {
	filter$: Observable<F>;
	setFilter$( filterModel: F ): Observable<T[]>;
}
