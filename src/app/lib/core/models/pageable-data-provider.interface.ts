import { Observable } from 'rxjs/Observable';
import { DataProvider } from './data-provider.interface';

export interface PageableDataProvider<T> extends DataProvider<T> {
	itemCount$: Observable<number>;
	actualPage$: Observable<number>;
	totalPages$: Observable<number>;
	pageSize$: Observable<number>;

	nextPage$(): Observable<T[]>;
	previousPage$(): Observable<T[]>;
	goToPage$( targetPage: number ): Observable<T[]>;
	setPageSize( targetPageSize: number );
}
