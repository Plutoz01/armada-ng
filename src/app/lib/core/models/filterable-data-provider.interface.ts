import { Observable } from 'rxjs/Observable';

import { DataProvider } from './data-provider.interface';
import { Filter } from './filter.interface';

export interface FilterableDataProvider<T, F extends Filter> extends DataProvider<T> {
	filter$: Observable<F>;
	updateFilter$( filter: F ): Observable<T[]>;
}
