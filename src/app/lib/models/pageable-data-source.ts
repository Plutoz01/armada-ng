import { Observable } from 'rxjs';
import { DataSource } from './data-sources';

export interface PageableDataSource<T> extends DataSource<T> {
	actualPage$: Observable<number>;
	totalPages$: Observable<number>;
	pageSize$: Observable<number>;

	next$(): Observable<T[]>;
	previous$(): Observable<T[]>;
	goToPage$( targetPage: number ): Observable<T[]>;
	setPageSize( targetPageSize: number );
}
