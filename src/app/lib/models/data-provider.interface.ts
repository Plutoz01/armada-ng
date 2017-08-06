import { Observable } from 'rxjs/Observable';

export interface DataProvider<T> {
	items$: Observable<T[]>;

	refresh$(): Observable<T[]>;
}
