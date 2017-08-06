import { Observable } from 'rxjs';
import { DataProvider } from './data-provider.interface';

export interface LazyLoadDataProvider<T> extends DataProvider<T> {
	hasMore$: Observable<boolean>;
	loadMore$(): Observable<T[]>;
}
