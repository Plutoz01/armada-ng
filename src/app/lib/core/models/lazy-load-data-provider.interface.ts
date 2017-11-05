import { Observable } from 'rxjs/Observable';
import { DataProvider } from './data-provider.interface';

export interface LazyLoadDataProvider<T> extends DataProvider<T> {
	hasMore$: Observable<boolean>;
	loadMore$(): Observable<T[]>;
}
